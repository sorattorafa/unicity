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
    comment_report: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Report' 
    },
    comment_createDate: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },   
    content: { 
        type: String, 
        required: true, 
        trim: true 
    },
    comment_status: { 
        type: Number, 
        required: true, 
        default: 0 
    }, 
}); 
  
// export the model of customer 
module.exports = mongoose.model('Comment', schema);