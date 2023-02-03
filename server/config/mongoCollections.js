const dbConnection = require("./mongoConnection");

const getCollectionFn = collection => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

module.exports = {
    options: getCollectionFn("options"),
    stocks: getCollectionFn("stocks"),
    users: getCollectionFn("users"),
    watchlist: getCollectionFn("watchlist"),
    holdings: getCollectionFn("holdings"),
    trades: getCollectionFn("trades"),
};