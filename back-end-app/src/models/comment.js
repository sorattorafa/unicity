'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
// create a new schema of comment

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
    content: { 
        type: String, 
        required: true, 
        trim: true 
    },     
    comment_denunciations: { 
        type: Number, 
        required: true,
        default: 0
    },     
    comment_supports: { 
        type: Number, 
        required: true,
        default: 0
    },   
}); 
  
// export the model of customer 
module.exports = mongoose.model('Comment', schema);