const express = require('express');
const router = express.Router();
const data = require('../data');
const stockData = data.stocks;

router.get('/:symbol/:year', async (req, res) => {
    console.log("Database route 1")
    const symbol = req.params.symbol;
    const year = req.params.year; 
    try {
        const stock = await stockData.getStockByYear(symbol, year);
        res.json(stock);
    } catch (e) {
        res.status(404).json({ error: 'stock not found' });
    }
});

router.get('/:symbol/:year/:month', async (req, res) => {
    console.log("Database route 2")
    const symbol = req.params.symbol;
    const year = req.params.year;
    const month = req.params.month;
    try {
        const stock = await stockData.getStockBySymbol(symbol, year, month);
        res.json(stock.data);
    } catch (e) {
        res.status(404).json({ error: 'stock not found' });
    }
    
    
});

// router.post('/', async(req,res)=>{
//   const newStock = req.body;
//   if(!newStock.uid){
//     res.status(404).json({ error: 'No stockId provided' })
//   }

//   try{
//     await stockData.register(newStock.uid)
//     const stockInfo = await stockData.getstockById(newStock.uid)
//     res.json(stockInfo)
//   }catch(e){
//     res.status(500)
//   }
// })

module.exports = router;