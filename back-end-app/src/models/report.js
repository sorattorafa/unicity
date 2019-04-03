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
    description: { 
        type: String, 
        required: true, 
        trim: true 
    },     

    status: { 
        type: Boolean, 
        required: true, 
        default: false 
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
    
    comments: [{  
        // DIR'S
        comment: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment' 
        }, 
    }],     
     
    categories: [{  
        // DIR'S
        category: { 
            type: String,  
            required: true, 
            trim: true 
        }, 
    }],    

}); 
  

// export the model of customer 
module.exports = mongoose.model('Report', schema);