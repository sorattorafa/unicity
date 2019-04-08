'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  
// create a new schema of companyuser  
const schema = new Schema({ 
    cnpj: { // 16 caracteres
        type: String, 
        required: true, 
        trim: true 
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
    email: { 
        type: String, 
        required: true, 
        trim: true  
    },    
    password: { 
        type: String, 
        required: true, 
        trim: true 
    },     

    solvedreports: [{ // one company have n solved reports  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Report' 
    }],  

    categories: [{ 
        type: String, 
        required: true, 
        trim: true  
    }] 

}); 
  
// export the model of Requester 
module.exports = mongoose.model('Companyuser', schema);
