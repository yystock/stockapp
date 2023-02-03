const mongoCollections = require('../config/mongoCollections');
const options = mongoCollections.options;

module.exports = {
    async getOptionBySymbol(symbol, date) {
      if (!symbol) throw 'You must provide an symbol to search for option';
      if (!date) throw 'You must provide an date to search for option';
      const optionCollection = await options();
      const option = await optionCollection.findOne({symbol: symbol, date: date});
      if (!option) throw 'No option with that symbol';
      return option;
    },
    async storeOption(symbol, date, data){
      if (!symbol) throw 'You must provide a symbol ';
      if (!date) throw 'You must provide a date ';
      if (!data) throw 'You must provide a data ';
      const optionCollection = await options();
      const newOption = {
        symbol: symbol,
        date: date,
        data: data
      }
      const optionInfo = await optionCollection.insertOne(newOption);
      if (!optionInfo) throw 'error in storing the option';
      return optionInfo;
    }
}