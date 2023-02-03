const express = require('express');
const router = express.Router();
const data = require('../data');
const tradesData = data.trades;
const holdingsData = data.holdings;
const usersData = data.users;


router.get('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const trade = await tradesData.getTradeByUser(id);
      res.json(trade);
  } catch (e) {
      res.status(404).json({ error: 'trade not found' });
  }
});

router.post('/', async(req,res)=>{

  let {userId, date, action, symbol, price, shares, total, status} = req.body;
  price = Number(price);
  shares = Number(shares);
  total = Number(total);
  let newBalance = 0;
  try{
    const user = await usersData.getUserById(userId);
    await tradesData.addTrade(userId, date, action, symbol, price, shares, total, status);
    const holdings = await holdingsData.getHoldingsByUserAndSymbol(userId, symbol);
    if (holdings) {
      if(action == 'buy'){
        holdings.shares = holdings.shares + shares;
        holdings.total = holdings.total + total;
        holdings.price = holdings.total / holdings.shares;
        
        newBalance = user.balance - total;
        
      }
      else{
        holdings.total = holdings.total - total;
        holdings.shares = holdings.shares - shares;
        holdings.price = holdings.total / holdings.shares;
        
        newBalance = user.balance + total;
        
      }
      const updatedUser = await usersData.updateAccount(userId, newBalance);
      const updated = await holdingsData.updateHoldings(userId, symbol, holdings);
      
      res.json(holdings);

    } else {
      const response1 = await holdingsData.addHoldings(userId, symbol, price, shares, total);
      res.json(response1);
    };
    
  }catch(e){
    console.log(e)
    res.status(500).json({ error: 'Fail to Add Trade ' });
  }
})

module.exports = router;