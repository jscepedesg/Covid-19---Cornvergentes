const express = require('express');
const app = express();

//middlewares
const { MApp } = require('../middlewares/index');
app.use( MApp );

const CUser = require('../controllers/user');
app.use( CUser );

const CSymptom= require('../controllers/symptoms');
app.use( CSymptom );

const CRecord= require('../controllers/record');
app.use( CRecord );

module.exports = app;