const express = require('express');
const axios = require('axios');
const redis = require('redis');
const { promisify } = require('util');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Use the REDIS_URL environment variable for Redis connection
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient(redisUrl);
const getAsync = promisify(client.get).bind(client);

console.log(`Connecting to Redis at ${redisUrl}`);

// New API Key and Base URL
const API_KEY = '51a10f91-34a9-4ead-9c1f-3afe2a906208';
const BASE_URL = 'https://api.helius.xyz/v0/addresses/';

// Fetch balances function
async function fetchBalances(address) {
    try {
        console.log(`Fetching balance for address: ${address}`);
        const response = await axios.get(`${BASE_URL}${address}/balances?api-key=${API_KEY}`);
        const balance = response.data.nativeBalance;
        console.log(`Fetched balance for address ${address}: ${balance}`);
        return balance;
    } catch (error) {
        console.error(`Error fetching balance for address ${address}:`, error.message);
        throw error;
    }
}

// Middleware for logging
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.originalUrl}`);
    next();
});

// Test Route
app.get('/test', async (req, res) => {
    try {
        console.log('Testing route...');
        res.send('Test route is working');
    } catch (error) {
        console.error('Error in test route:', error.message);
        res.status(500).send('Error in test route');
    }
});

// DCC Route
app.get('/dcc', async (req, res) => {
    try {
        console.log('Fetching DCC balances...');
        const [balance1, balance2] = await Promise.all([
            fetchBalances('FQpAdBocBoxQpZh5P5S8fFuUbVDAAPgoqXvC3NJYReFL'),
            fetchBalances('BrrrnDGpGURbekEJRNsN8k5qxbUyYsBTVnXPMupbMmjW')
        ]);

        console.log(`DCC balances fetched: balance1=${balance1}, balance2=${balance2}`);
        res.json({ balance1, balance2 });
    } catch (error) {
        console.error('Error fetching DCC balances:', error.message);
        res.status(500).send('Error fetching DCC balances');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Clean up Redis client on exit
process.on('SIGINT', () => {
    console.log('Closing Redis client');
    client.quit();
});
