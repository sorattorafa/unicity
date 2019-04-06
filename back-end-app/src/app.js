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
const Category = require('./models/category')
// load routes 
const indexRoute = require('./routes/index'); 

const simpleuserRoute = require('./routes/simpleuser');

const categoryRoute = require('./routes/category');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

 
// index route
app.use('/', indexRoute);    

// route 
app.use('/simpleusers', simpleuserRoute);  
app.use('/categories', categoryRoute); 
 
module.exports = app; 
