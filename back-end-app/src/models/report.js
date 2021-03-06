'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
// create a new schema of customer
const schema = new Schema({  
   
    lat: { 
        type: String, 
        required: true, 
        trim:true,
    }, 
    lng: { 
        type: String, 
        required: true, 
        trim:true,
    },
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },  
    cep: { 
        type: String,  
        trim: true 
    },   
    street: { 
        type: String,  
        trim: true 
    },  
    number: { 
        type: String,  
        trim: true 
    },  
    description: { 
        type: String, 
        required: true, 
        trim: true 
    },     
    status: { 
        type: Number, 
        required: true, 
        default: 0 
    },        
    createDate: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },  
    number_of_denunciations: { 
        type: Number,
        required: true, 
        default: 0
    },  
    number_of_supports: { 
        type: Number,
        required: true, 
        default: 0  
    },     
    comment: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    },   
    solver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Companyuser' 
    },  
    city: {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City'
        // required: true
    },        
    simpleuser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Simpleuser', 
        required:true 
    },   
  //categories: [{  
    category: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Category',
        required: true
    }, 
  //}],    
}); 
  

// export the model of customer 
module.exports = mongoose.model('Report', schema);