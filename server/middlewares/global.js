'use strict'
//Get the libraries
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//Run express
const app = express();
//Type JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Enable the public folder
app.use( express.static( path.resolve(__dirname, '../../public')));

module.exports = app;