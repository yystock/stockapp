const mongoCollections = require('../config/mongoCollections');
const holdings = mongoCollections.holdings;

module.exports = {
    async getHoldingsByUser(userId) {
      if (!userId) throw 'You must provide an userId to search for holdings';
     
      const holdingsCollection = await holdings();
      const holdingsInfo = await holdingsCollection.find({ userId: userId }).toArray();
      if (holdingsInfo.length == 0) throw 'No holdings with that symbol';
      return holdingsInfo;
    },
    async getHoldingsByUserAndSymbol(userId, symbol) {

      if (!userId) throw 'You must provide an userId to search for holdings';
      if (!symbol) throw 'You must provide an symbol to search for holdings';

      const holdingsCollection = await holdings();

      const holdingsInfo = await holdingsCollection.findOne({userId: userId, symbol: symbol});

      if (!holdingsInfo) return null;
      return holdingsInfo;
    },
    async addHoldings(userId, symbol, price, shares, total){
      if (!userId) throw 'You must provide a userId ';
      if (!symbol) throw 'You must provide a symbol ';
      if (!price) throw 'You must provide a price ';
      if (!shares) throw 'You must provide a shares ';
      const holdingsCollection = await holdings();
      const newHoldings = {
        userId: userId,
        symbol: symbol,
        price: price,
        shares: shares,
        total: total,
      }
      const holdingsInfo = await holdingsCollection.insertOne(newHoldings);
      if (!holdingsInfo) throw 'error in storing the holdings';
      return holdingsInfo;
    },
    async removeHoldings(userId, symbol) {
      const holdingsCollection = await holdings();
      let holdings = null;
      try {
        holdings = await this.getHoldingsByUserAndSymbol(userId, symbol);
      } catch (e) {
        console.log(e);
        return;
      }
      const deletionInfo = await holdingsCollection.removeOne({ userId: userId, symbol: symbol });
      if (deletionInfo.deletedCount === 0) {
        throw `Could not delete holdings with id of ${userId}`;
      }
      return true;
    },


    async updateHoldings(userId, symbol, updatedData) {
      const holdingsCollection = await holdings();
     
      try {
        const updated = await holdingsCollection.updateOne({userId: userId, symbol: symbol}, { $set: updatedData });
        console.log(updated)
        return true;
      } catch (e) {
        console.log(e);
        return;
      }
    },
   
    async deleteHoldingsByUser(userId) {
      if (!userId) throw 'You must provide an userId to search for holdings';
     
      const holdingsCollection = await holdings();
      const holdingsInfo = await holdingsCollection.deleteMany({userId: userId});
      if (holdingsInfo.deletedCount === 0) return 'No holdings with that symbol';
      return holdingsInfo;
       
    },
    
}