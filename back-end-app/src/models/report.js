'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
// create a new schema of customer
const schema = new Schema({  
 
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },  
    cep: { 
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
    },  

    number_of_supports: { 
        type: Number, 
        required: true, 
    },    
     
    comment: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    },  

    city: {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City' 
    },     
     
    categories: [{  
        // DIR'S
        category: { 
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'Category'
        }, 
    }],    

}); 
  

// export the model of customer 
module.exports = mongoose.model('Report', schema);