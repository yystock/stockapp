const express = require("express");
const apiRoutes = require('./test');
const dbRoutes = require('./database');
const avRoutes = require('./av-api');
const holdingsRoutes = require('./holdings');
const watchlistRoutes = require('./watchlist');
const optionsRoutes = require('./options');
const usersRoutes = require('./users');
const tradesRoutes = require('./trades');
const constructorMethod = app => {
   
    app.use("/db/stocks/", dbRoutes);
    app.use("/api/stocks/", apiRoutes);
    app.use("/api/options/", optionsRoutes);
    app.use("/av-api/stocks/", avRoutes);
    app.use("/watchlist/", watchlistRoutes);
    app.use("/holdings/", holdingsRoutes);
    app.use("/users/", usersRoutes);
    app.use("/trades/", tradesRoutes);
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;