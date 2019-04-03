'use strict'; 
 
const express = require('express');  
const bodyParser = require('body-parser'); 
 
// db
const mongoose = require('mongoose');  

// config 
const config = require('./config');


const app = express(); 
const router = express.Router();  
 
// connect with moongose database
mongoose.connect(config.connectionString)
 

// load schemas (models) of database
const Simpleuser = require('./models/simpleuser'); 

// load routes 
const indexRoute = require('./routes/index'); 

const simpleuserRoute = require('./routes/simpleuser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

 
// index route
app.use('/', indexRoute);    

// simple user route 
app.use('/simpleusers', simpleuserRoute); 
 
module.exports = app; 
