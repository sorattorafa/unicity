'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  


// create a new schema of requester  

const schema = new Schema({ 
    cpf: { // xxx.yyy.zzz - ab
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
    },       
    active:{  
        type:Boolean, 
        required:false, 
        default:true
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
    },     

    reports: [{ // Um usuário possui n relatos 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Report', 
        required: false 
    }],  

    notifications: [{  // para avisar quando os relatos foram resolvidos
        type: String, 
        required: false, 
        trim: true  
    }] 
    
}); 
  
// export the model of Requester 
module.exports = mongoose.model('Simpleuser', schema);