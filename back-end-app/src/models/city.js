'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
// create a new schema of customer
const schema = new Schema({  
 
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },  
    state: { 
        type: String, 
        required: true, 
        trim: true 
    } 
}); 
  

// export the model of customer 
module.exports = mongoose.model('City', schema);