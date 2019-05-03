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
mongoose.connect(config.connectionString,  { useNewUrlParser: true } )
 

// load schemas (models) of database
const Simpleuser = require('./models/simpleuser'); 
const Category = require('./models/category') 
const Companyuser = require('./models/companyuser') 
const Comment = require('./models/comment')  
const Adminuser = require('./models/adminuser') 




// load routes 
const indexRoute = require('./routes/index'); 
const simpleuserRoute = require('./routes/simpleuser');
const categoryRoute = require('./routes/category'); 
const companyRoute = require('./routes/companyuser'); 
const commentRoute = require('./routes/comment'); 
const adminuserRoute = require('./routes/adminuser'); 



app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

 
// index route
app.use('/', indexRoute);    

// route 
app.use('/simpleusers', simpleuserRoute);   
app.use('/categories', categoryRoute); 
app.use('/companyusers', companyRoute); 
app.use('/adminusers', adminuserRoute);  
app.use('/comments', commentRoute);   

module.exports = app; 
