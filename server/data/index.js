const holdingsData = require("./holdings");
const usersData = require('./users');
const stocksData = require('./stocks');
const optionsData = require('./options');
const tradesData = require('./trades');
const watchlistData = require('./watchlist');

module.exports = {
    holdings: holdingsData,
    stocks: stocksData,
    users: usersData,
    options: optionsData,
    trades:tradesData,
    watchlist:watchlistData,

};