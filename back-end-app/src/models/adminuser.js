'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  


// create a new schema of requester  

const schema = new Schema({ ,       
    cpf: { // xxx.yyy.zzz - ab
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
    }, 
    name: { 
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
    }] 
    
}); 
  
// export the model of Requester 
module.exports = mongoose.model('Adminuser', schema);