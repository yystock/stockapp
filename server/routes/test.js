const express = require('express');
const router = express.Router();
const axios = require('axios');
const { IEX_Sandbox, IEX_key } = process.env;
const moment = require('moment')

router.get('/search', (req, res) => {
    const symbol = req.query.symbol;  
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote&token=${IEX_Sandbox}`
      )
      .then(response => {
        res.json(response.data[Object.keys(response.data)[0]].quote);
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).json({
          errorMessage: 'Something went wrong on the server. Please try again.',
        });

      });
  });

router.get('/list', (req, res) => {
  const symbol = req.query.symbol; 
  const holdings = [];
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote&token=${IEX_Sandbox}`
    )
    .then(function (response) {
      Object.keys(response.data).forEach(function (key) {
        holdings.push(response.data[key].quote);
      });
      res.json(holdings);
    })
    .catch(function (err) {
      console.log('Error:', err);
      res.status(500).json({
        errorMessage: 'Something went wrong on the server. Please try again.',
      });
    });
});
router.get('/sector-list', (req, res) => {
  const symbol = [
    {
        "name": "Communication Services",
        "value": 10,
        "children": [
            {"name": "FB"},
            {"name": "GOOGL"},
            {"name": "NFLX"},
            {"name": "CMCSA"},
            {"name": "DIS"}
        ]
    },
    {
        "name": "Consumer Cyclical",
        "value": 12,
        "children": [
            {"name": "AMZN"},
            {"name": "PG"},
            {"name": "HD"},
            {"name": "LOW"},
            {"name": "NKE"}
        ]
    },
    {
        "name": "Consumer Defensive",
        "value": 6.1,
        "children": [
            {"name": "KO"},
            {"name": "PG"},
            {"name": "PM"},
            {"name": "WBA"},
            {"name": "KHC"}
        ]
    },
    {
        "name": "Energy",
        "value": 3.4,
        "children": [
            {"name": "XOM"},
            {"name": "CVX"},
            {"name": "COP"},
            {"name": "SLB"},
            {"name": "DVN"}
        ]
    },
    {
        "name": "Financial",
        "value": 11.3,
        "children": [
            {"name": "JPM"},
            {"name": "BRK.A"},
            {"name": "WFC"},
            {"name": "BAC"},
            {"name": "C"}
        ]
    },
    {
        "name": "Health Care",
        "value": 13.1,
        "children": [
            {"name": "JNJ"},
            {"name": "UNH"},
            {"name": "BRK.A"},
            {"name": "PG"},
            {"name": "ABBV"}
        ]
    },
    {
      "name": "Industrials",
      "value": 7.8,
      "children": [
          {"name": "BA"},
          {"name": "UTX"},
          {"name": "GE"},
          {"name": "MMM"},
          {"name": "HON"}
      ]
  },
  {
      "name": "Real Estate",
      "value": 2.7,
      "children": [
          {"name": "SPG"},
          {"name": "PLD"},
          {"name": "PSA"},
          {"name": "AMT"},
          {"name": "EQIX"}
      ]
  },
  {
      "name": "Technology",
      "value": 28.7,
      "children": [
          {"name": "AAPL"},
          {"name": "MSFT"},
          {"name": "AMZN"},
          {"name": "FB"},
          {"name": "GOOGL"}
      ]
  },
  {
      "name": "Utilities",
      "value": 2.5,
      "children": [
          {"name": "NEE"},
          {"name": "D"},
          {"name": "SO"},
          {"name": "DUK"},
          {"name": "EXC"}
      ]
  },
  {
      "name": "Basic Materials",
      "value": 2.5,
      "children": [
          {"name": "BHP"},
          {"name": "RIO"},
          {"name": "FCX"},
          {"name": "NEM"},
          {"name": "AA"}
      ]
  }]
  let symbols = "";
  symbol.map((x) => x["children"].map((y) => symbols+=y.name+","));
  let holdings = [];
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}l&types=quote&token=${IEX_Sandbox}`
    )
    .then(function (response) {
      Object.keys(response.data).forEach(function (key) {
        symbol.map((x) => {x["children"].map((y) =>{
          if(key==y.name){
            holdings.push({
              "name":response.data[key].quote.symbol,
              "change":response.data[key].quote.changePercent,
              'value':response.data[key].quote.marketCap,
              'color':response.data[key].quote.changePercent > 0? "#3DA86B":"#C73E43",
              "parent":x['name'],
            })       
          }
        })
      })
      });
  
      symbol.map((x) => {
        holdings.push({
          "name": x['name'],
          "id": x['name']
        })
      })
      
      res.json(holdings);
    })
    .catch(function (err) {
      console.log('Error:', err);
      res.status(500).json({
        errorMessage: 'Something went wrong on the server. Please try again.',
      });
    });
});


router.get('/most', (req, res) => {
  const request = req.query.request;
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/market/collection/list?collectionName=${request}&token=${IEX_Sandbox}`
    )
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (err) {
      console.log('Error:', err);
      res.status(500).json({
        errorMessage: 'Something went wrong on the server. Please try again.',
      });
    });
});

// chart Data  1. Line chart(1d)
router.get('/chart/:symbol/:range', (req, res) => {
  const symbol = req.params.symbol;
  const rangeUrl = {
    "1d": "1d/?filter=date,minute,open,high,low,close,volume",
    "5dm": "5dm/?filter=date,minute,open,high,low,close,volume",
    "1mm": "1mm/?filter=date,minute,open,high,low,close,volume",
    "3m": "3m/?filter=date,open,high,low,close,volume",
    "6m": "6m/?filter=date,open,high,low,close,volume",
    "1y": "1Y/?filter=date,open,high,low,close,volume",
    "2y": "2y/?filter=date,open,high,low,close,volume",
    "5y": "5y/?filter=date,open,high,low,close,volume"
  };
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${rangeUrl[req.params.range]}&token=${IEX_Sandbox}`
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

router.get('/advanced', (req, res) => {
  const symbol = req.query.symbol;  
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/advanced-stats?token=${IEX_Sandbox}`
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

router.get('/insider', (req, res) => {
  const symbol = req.query.symbol;  
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/insider-transactions?token=${IEX_Sandbox}`
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

router.get('/compare/:symbol1/:symbol2/:range', async (req, res) => {
  const symbol1 = req.params.symbol1;  
  const symbol2 = req.params.symbol2;
  const range = req.params.range;
  const data = []
  try{
      const response1 = await axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol1}/chart/${range}/?filter=date,close&token=${IEX_Sandbox}`)
      const format1 = [];
      response1.data.map((x) =>{
        format1.push([
            Number(moment(x['date']).format('x')), // the date
            x['close'], // close
        ]);
      });
      data.push({name:symbol1, data:format1});
      const response2 = await axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol2}/chart/${range}/?filter=date,close&token=${IEX_Sandbox}`)
      const format2 = [];
      response2.data.map((x) =>{
        format2.push([
            Number(moment(x['date']).format('x')), // the date
            x['close'], // close
        ]);
      });
      data.push({name:symbol2, data:format2});
      res.json(data);
   
  }catch(e){
      console.log("error", e)
  }
 
});

// USED FOR GETTING NAMES OF ALL SECTORS
router.get('/sectors', (req, res) => {
  axios
    .get(
      `https://cloud.iexapis.com/stable/ref-data/sectors?token=${IEX_key}`
    )
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).json({
        errorMessage: 'Something went wrong on the server. Please try again.',
      });
    });
});

// USED FOR GETTING PERFORMANCE OF ALL SECTORS
router.get('/sectors-performance', (req, res) => {
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/market/sector-performance?token=${IEX_Sandbox}`
    )
    .then(response => {    
      res.json(response.data);
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).json({
        errorMessage: 'Something went wrong on the server. Please try again.',
      });
    });
});



// CHECK ALL THE STOCKS IN A CERTAIN SECTOR
router.get('/single-sector/:sector', (req, res) => {
  const sector = encodeURIComponent(req.params.sector);
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/market/collection/sector?collectionName=${sector}&token=${IEX_Sandbox}`
    )
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).json({
        errorMessage: 'Something went wrong on the server. Please try again.',
      });
    });
});

// SECTOR ROTATION WITHIN 1 MONTH PERIOD 
router.get('/chart-sector', (req, res) => {
  const symbol = "XLB,XLV,XLU,XLP,XLE,XLRE,XLI,XLF,XLK,XLY,XLC";
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=chart&range=1m&token=${IEX_Sandbox}`
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

router.get('/news/:symbol/:last', (req, res) => {
  const symbol = req.params.symbol;
  const last = req.params.last;
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=news&last=${last}&token=${IEX_Sandbox}`
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

router.get('/intraday/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const last = req.params.last;
  axios
    .get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/intraday-prices&token=${IEX_Sandbox}`
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


