'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
// create a new schema of customer

const schema = new Schema({ 
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Simpleuser' 
    },  
    createDate: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },   
    description: { 
        type: String, 
        required: true, 
        trim: true 
    },     
 
    number_of_denunciations: { 
        type: Number, 
        required: true
    },     

       
}); 
  
// export the model of customer 
module.exports = mongoose.model('Comment', schema);