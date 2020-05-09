'use strict'
//Get the libraries
const express = require('express');
//Run express
const app = express();

//CORS
//Configure headers and cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//load route files
const project_routes = require('./routes/index');
app.use('/api', project_routes);

//middlewares
const { MApp } = require('./middlewares/index');
app.use( MApp );


//Export module
module.exports = app;