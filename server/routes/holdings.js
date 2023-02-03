const express = require('express');
const router = express.Router();
const data = require('../data');
const holdingsData = data.holdings;


router.get('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const trade = await holdingsData.getHoldingsByUser(id);
      res.json(trade);
  } catch (e) {
      res.status(404).json({ error: 'trade not found' });
  }
});


module.exports = router;