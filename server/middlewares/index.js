const express = require('express');
const MApp = express();

//Middlewares global
const MGoblal = require('./global');
MApp.use( MGoblal );

//Middlewares authentication
//const MAuthentication = require('./authentication');


module.exports = { MApp };