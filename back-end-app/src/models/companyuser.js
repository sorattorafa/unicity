'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  
// create a new schema of requester  
const schema = new Schema({ 
    cnpj: { // xxx.yyy.zzz - ab
        type: String, 
        required: true, 
        trim: true, 
        unique: true 
    },     
    name: { 
        type: String, 
        required: true, 
        trim: true  
    },       
    apresentation: { 
        type: String, 
        required: true, 
        trim: true  
    },       
    city: { 
        type: String, 
        required: true, 
        trim: true 
    }, 
    street: { 
        type: String, 
        required: true, 
        trim: true 
    },  
    number: { 
        type: String, 
        required: true, 
        trim: true 
    },   
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        unique: true  
    },    
    password: { 
        type: String, 
        required: true, 
        trim: true 
    },     
 
    active: { 
        type: Boolean,  
        default: true 
    },      

    solvedreports: [{ // one company have n solved reports  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Report' 
    }],  

    categories: [{ 
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Category',
        required: true 
    }]

}); 
  
// export the model of Requester 
module.exports = mongoose.model('Companyuser', schema);