'use strict'; 
const mongoose = require('mongoose'); 
const State =  mongoose.model('State'); 


exports.get = async () => {  
    const res = await State.find({ 
            active:true  
        }, 'name'); 
    return res;    
}  

exports.create = async (data) => { 
    var state = new State(data); 
    await state.save(); 
}  
 

exports.update = async(id,data) => { 
    await State   
    .findByIdAndUpdate(id, { 
        $set: {  
            // can update anything   
            name: data.name
        }
    });
} 
exports.delete = async(id) => { 
    await State.findByIdAndDelete(id);
}  

 