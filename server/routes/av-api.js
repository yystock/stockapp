const express = require('express');
const router = express.Router();
const axios = require('axios');
router.get('/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    axios
        .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=GN49Z43VNENUY6RW`
        )
        .then(response => {
        res.json(response.data);
        })
        .catch(error => {
        res.status(500).json({
            errorMessage: 'Something went wrong on the server. Please try again.',
        });
        });
 
});

router.get('/news/:symbol/:limit', async (req, res) => {
    const symbol = req.params.symbol;
    const limit = req.params.limit;
    axios
        .get(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&limit=${limit}&apikey=GN49Z43VNENUY6RW`
        )
        .then(response => {
        res.json(response.data);
        })
        .catch(error => {
        res.status(500).json({
            errorMessage: 'Something went wrong on the server. Please try again.',
        });
        });
 
});

module.exports = router;