const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const tradesData = data.trades;
const holdingsData = data.holdings;

router.get('/:id', async (req, res) => {
  try {
      const id = req.params.id; 
      const user = await userData.getUserById(id);
      res.json(user);
  } catch (e) {
      res.status(404).json({ error: 'User not found' });
  }
});

router.post('/', async(req,res)=>{
  const newUser = req.body;
  if(!newUser.uid){
    res.status(404).json({ error: 'No userId provided' })
  }

  try{
    await userData.register(newUser.uid)
    const userInfo = await userData.getUserById(newUser.uid)
    res.json(userInfo)
  }catch(e){
    res.status(500)
  }
})

router.delete('/delete/:id', async(req,res)=>{ 
  
  if(!req.params.id){
    res.status(404).json({ error: 'No userId provided' })
  }
  const id = req.params.id;

  try{
    const trade = await tradesData.deleteTradeByUser(id);
    console.log(trade)
    const holdings = await holdingsData.deleteHoldingsByUser(id);
    console.log(holdings)
    const user = await userData.resetAccount(id);
    res.json("Done Reset")
  }catch(e){

    res.status(500)
  }
})

module.exports = router;