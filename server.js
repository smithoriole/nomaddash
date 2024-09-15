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

// API Key and Base URL
const API_KEY = process.env.API_KEY || 'eff3cc4b-32f2-47d0-b6a0-ae82a5ba3159';
const BASE_URL = 'https://api.helius.xyz/v0/addresses/';

// Fetch balances function
async function fetchBalances(address) {
    const response = await axios.get(`${BASE_URL}${address}/balances?api-key=${API_KEY}`);
    return response.data.nativeBalance;
}

// Cache middleware
async function cache(req, res, next) {
    const cacheKey = req.originalUrl;
    const cachedData = await getAsync(cacheKey);

    if (cachedData) {
        return res.json(JSON.parse(cachedData));
    }

    res.sendResponse = res.json;
    res.json = (body) => {
        client.setex(cacheKey, 60, JSON.stringify(body)); // Cache for 60 seconds
        res.sendResponse(body);
    };

    next();
}

// Helper function to calculate values
function calculateValues(data1, data2, coefficient, payoutFactor) {
    const revenue = (((data1 / 1000000000) + (data2 / 1000000000)) * coefficient);
    const payout = (revenue * payoutFactor) / 20000;
    return {
        revenue,
        payout,
        cat: payout * localStorage.getItem("catsOwned")
    };
}

// Routes

app.get('/dcc', cache, async (req, res) => {
    try {
        const [balance1, balance2] = await Promise.all([
            fetchBalances('FQpAdBocBoxQpZh5P5S8fFuUbVDAAPgoqXvC3NJYReFL'),
            fetchBalances('BrrrnDGpGURbekEJRNsN8k5qxbUyYsBTVnXPMupbMmjW')
        ]);

        const values = calculateValues(balance1, balance2, 0.7, 0.44);
        res.json(values);
    } catch (error) {
        res.status(500).send('Error fetching DCC balances');
    }
});

app.get('/ds', cache, async (req, res) => {
    try {
        const [balance1, balance2] = await Promise.all([
            fetchBalances('SpinoutmA1gax3vWqRByD3rUPdLN2mXyqGR6PZ1RNvd'),
            fetchBalances('dsHJ7jpqSaDPAkLyvefuWScBDEvQ6MPyzectajaNWA9')
        ]);

        const values = calculateValues(balance1, balance2, 0.7, 0.25);
        res.json(values);
    } catch (error) {
        res.status(500).send('Error fetching DS balances');
    }
});

app.get('/insurance', cache, async (req, res) => {
    try {
        const balance = await fetchBalances('DCFSBGZFygDwMMpyCP1BHbstiYwHF7yuQ8yLfxcqDe2Y');

        const revenue = (balance / 1000000000 * 0.7);
        const payout = (revenue * 0.25) / 20000;
        const cat = payout * localStorage.getItem("catsOwned");

        res.json({ revenue, payout, cat });
    } catch (error) {
        res.status(500).send('Error fetching insurance balances');
    }
});

app.get('/dcf', cache, async (req, res) => {
    try {
        const [balance1, balance2] = await Promise.all([
            fetchBalances('h2oMkkgUF55mxMFeuUgVYwvEnpV5kRbvHVuDWMKDYFC'),
            fetchBalances('dcfik2oUsdjDYmYbKxAKLWAnGXDS7gMmATA22EfRDqN')
        ]);

        const values = calculateValues(balance1, balance2, 0.595, 0.6);
        res.json(values);
    } catch (error) {
        res.status(500).send('Error fetching DCF balances');
    }
});

app.listen(port, (
