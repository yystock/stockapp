const mongoCollections = require('../config/mongoCollections');
const trades = mongoCollections.trades;
const uuid = require('uuid');

module.exports = {
    async getTradeByUser(userId) {
      if (!userId) throw 'You must provide an userId to search for Trade';
     
      const tradeCollection = await trades();
      const tradeInfo = await tradeCollection.find({ userId: userId }).toArray();
      if (!tradeInfo) throw 'No Trade with that symbol';
      return tradeInfo;
    },
    async addTrade(userId, date, action, symbol, price, shares, total, status){
      if (!userId) throw 'You must provide a userId ';
      if (!date) throw 'You must provide a date ';
      if (!action) throw 'You must provide a action ';
      if (!symbol) throw 'You must provide a symbol ';
      if (!price) throw 'You must provide a price ';
      if (!shares) throw 'You must provide a shares ';
      const tradeCollection = await trades();
      const newTrade = {
        _id: uuid.v4(),
        userId: userId,
        date: date,
        action: action,
        symbol: symbol,
        price: price,
        shares: shares,
        total:total,
        status: status,
      }
      const tradeInfo = await tradeCollection.insertOne(newTrade);
      if (!tradeInfo) throw 'error in storing the Trade';
      return tradeInfo;
    },

    async deleteTradeByUser(userId) {
      if (!userId) throw 'You must provide an userId to search for Trade';
     
      const tradeCollection = await trades();
      const tradeInfo = await tradeCollection.deleteMany({userId: userId});
      if (tradeInfo.deletedCount === 0) return'No Trade with that symbol';
      return tradeInfo;
       
    },


}