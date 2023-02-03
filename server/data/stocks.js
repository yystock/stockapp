const mongoCollections = require('../config/mongoCollections');
const stocks = mongoCollections.stocks;

module.exports = {
    async getStockBySymbol(symbol, year, month) {
      if (!symbol) throw 'You must provide an symbol to search for stock';
      if (!month) throw 'You must provide an month to search for stock';
      if (!year) throw 'You must provide an year to search for stock';
      const stockCollection = await stocks();
      const stock = await stockCollection.findOne({"symbol": symbol, "year": Number(year), "month": Number(month)});
      if (!stock) throw 'No stock with that symbol';
      return stock;
    },
    async getStockByYear(symbol, year) {
        if (!symbol) throw 'You must provide an symbol to search for stock';
        if (!year) throw 'You must provide an year to search for stock';
        const stockCollection = await stocks();
        const stock = await stockCollection.find({"symbol": symbol, "year": Number(year)}, { projection:{"symbol": 0, "year": 0, "month": 0, _id: 0 }}).toArray();
        if (!stock) throw 'No stock with that symbol';
        return stock;        
      },
    async storeStock(symbol, year, month, data){
      if (!symbol) throw 'You must provide a symbol ';
      if (!year) throw 'You must provide a year ';
      if (!month) throw 'You must provide a month ';
      if (!data) throw 'You must provide a data ';
      const stockCollection = await stocks();
      const newStock = {
        symbol: symbol,
        year: year,
        month: month,
        data: data
      }
      const stockInfo = await stockCollection.insertOne(newStock);
      if (!stockInfo) throw 'error in storing the stock';
      return stockInfo;
    }
}