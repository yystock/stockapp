const express = require("express");
const router = express.Router();
const data = require("../data");
const watchlistData = data.watchlist;

router.get("/:userId", async (req, res) => {
 
  if (!req.params.userId) {
    res.status(400).json({ error: "Must include an id" });
  }
  try {
    const watchlist = await watchlistData.getWatchlistByUser(req.params.userId);
    res.json(watchlist);
  } catch (e) {
    res.status(404).json({ error: "No watchlist found for this user" });
  }
});

router.post("/:userId/:symbol", async (req, res) => {
  if (!req.params.userId) {
    res.status(400).json({ error: "Must include an id" });
  }
  if (!req.params.symbol) {
    res.status(400).json({ error: "Must include an symbol" });
  }
  try {
 
    const watchlist = await watchlistData.addWatchlist(req.params.userId, req.params.symbol);
    res.json(watchlist);
  } catch (e) {
    res.status(404).json({ error: "Error in Adding the watchlist" });
  }
  
});


module.exports = router;