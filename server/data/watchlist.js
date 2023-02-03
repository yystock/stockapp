const mongoCollections = require('../config/mongoCollections');
const watchlist = mongoCollections.watchlist;

module.exports = {
    async getWatchlistByUserAndSymbol(userId, symbol) {
        if (!userId) throw 'You must provide an id to search for';
        if (!symbol) throw 'You must provide an symbol to search for';
        const watchlistCollection = await watchlist();
        const watchlistInfo = await watchlistCollection.findOne({userId: userId, symbol:symbol});
        if (!watchlistInfo) throw 'No watchlist with that id';
        return watchlistInfo;
      },
    async getWatchlistByUser(userId) {
      if (!userId) throw 'You must provide an userId to search for Watchlist';
     
      const watchlistCollection = await watchlist();
      const watchlistInfo = await watchlistCollection.find({ userId: userId }).toArray();
      if (watchlistInfo.length == 0) throw 'No Watchlist with that symbol';
      return watchlistInfo;
    },
    async addWatchlist(userId, symbol){
      if (!userId) throw 'You must provide a userId ';
      if (!symbol) throw 'You must provide a symbol ';

      const watchlistCollection = await watchlist();
      const newWatchlist = {
        userId: userId,
        symbol: symbol,
      }
      try{
        const response = await this.getWatchlistByUserAndSymbol(userId, symbol)
        return null;
  
       }catch(e){
       
        const watchlistInfo = await watchlistCollection.insertOne(newWatchlist);
        if (!watchlistInfo) throw 'error in storing the Watchlist';
        return watchlistInfo;
            
        }
    
    },
    async removeWatchlist(userId, symbol) {
        if (!userId) throw 'You must provide an id to search for';
        if (!symbol) throw 'You must provide an symbol to search for';
        const WatchlistCollection = await watchlist();
        const deletionInfo = await WatchlistCollection.removeOne({ userId: userId, symbol: symbol });
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete Watchlist with id of ${userId}`;
        }
        return true;
      },

      async deleteWatchlistByUser(userId) {
        if (!userId) throw 'You must provide an userId to search for watchlist';
       
        const watchlistCollection = await watchlists();
        const watchlistInfo = await watchlistCollection.deleteMany({userId: userId});
        if (!watchlistInfo.deletedCount === 0) throw 'No watchlist with that symbol';
        return watchlistInfo;
         
      },
}