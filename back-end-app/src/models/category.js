'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
// create a new schema of customer
const schema = new Schema({   
    active: { 
        type: Boolean, 
        required:true, 
        default:true
    },
    
    id: { 
        type: String, 
        required: true, 
        trim: true 
    }, 

    name: { 
        type: String, 
        required: true, 
        trim: true, 
        unique: true 
    }, 

    description: { 
        type: String, 
        required: true, 
        trim: true 
    }  

}); 
  

// export the model of customer 
module.exports = mongoose.model('Category', schema);    