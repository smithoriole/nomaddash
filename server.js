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

// New API Key and Base URL
const API_KEY = '51a10f91-34a9-4ead-9c1f-3afe2a906208';
const BASE_URL = 'https://api.helius.xyz/v0/addresses/';

// Fetch balances function
async function fetchBalances(address) {
    try {
        const response = await axios.get(`${BASE_URL}${address}/balances?api-key=${API_KEY}`);
        const balance = response.data.nativeBalance;
        console.log(`Fetched balance for address ${address}: ${balance}`);
        return balance;
    } catch (error) {
        console.error(`Error fetching balance for address ${address}:`, error);
        throw error;
    }
}

// Cache middleware
async function cache(req, res, next) {
    const cacheKey = req.originalUrl;
    const cachedData = await getAsync(cacheKey);

    if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.json(JSON.parse(cachedData));
    }

    console.log(`Cache miss for ${cacheKey}`);
    res.sendResponse = res.json;
    res.json = (body) => {
        client.setex(cacheKey, 60, JSON.stringify(body)); // Cache for 60 seconds
        res.sendResponse(body);
    };

    next();
}

// Routes
app.get('/dcc', cache, async (req, res) => {
    try {
        const [balance1, balance2] = await Promise.all([
            fetchBalances('FQpAdBocBoxQpZh5P5S8fFuUbVDAAPgoqXvC3NJYReFL'),
            fetchBalances('BrrrnDGpGURbekEJRNsN8k5qxbUyYsBTVnXPMupbMmjW')
        ]);

        console.log(`DCC balances fetched: balance1=${balance1}, balance2=${balance2}`);
        res.json({ balance1, balance2 });
    } catch (error) {
        console.error('Error fetching DCC balances:', error);
        res.status(500).send('Error fetching DCC balances');
    }
});

app.get('/ds', cache, async (req, res) => {
    try {
        const [balance1, balance2] = await Promise.all([
            fetchBalances('SpinoutmA1gax3vWqRByD3rUPdLN2mXyqGR6PZ1RNvd'),
            fetchBalances('dsHJ7jpqSaDPAkLyvefuWScBDEvQ6MPyzectajaNWA9')
        ]);

        console.log(`DS balances fetched: balance1=${balance1}, balance2=${balance2}`);
        res.json({ balance1, balance2 });
    } catch (error) {
        console.error('Error fetching DS balances:', error);
        res.status(500).send('Error fetching DS balances');
    }
});

app.get('/insurance', cache, async (req, res) => {
    try {
        const balance = await fetchBalances('DCFSBGZFygDwMMpyCP1BHbstiYwHF7yuQ8yLfxcqDe2Y');
        console.log(`Insurance balance fetched: ${balance}`);
        res.json({ balance });
    } catch (error) {
        console.error('Error fetching insurance balance:', error);
        res.status(500).send('Error fetching insurance balance');
    }
});

app.get('/dcf', cache, async (req, res) => {
    try {
        const [balance1, balance2] = await Promise.all([
            fetchBalances('h2oMkkgUF55mxMFeuUgVYwvEnpV5kRbvHVuDWMKDYFC'),
            fetchBalances('dcfik2oUsdjDYmYbKxAKLWAnGXDS7gMmATA22EfRDqN')
        ]);

        console.log(`DCF balances fetched: balance1=${balance1}, balance2=${balance2}`);
        res.json({ balance1, balance2 });
    } catch (error) {
        console.error('Error fetching DCF balances:', error);
        res.status(500).send('Error fetching DCF balances');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Clean up Redis client on exit
process.on('SIGINT', () => {
    client.quit();
});
