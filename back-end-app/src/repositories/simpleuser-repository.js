'use strict'; 
const mongoose = require('mongoose'); 
const Simpleuser =  mongoose.model('Simpleuser');  
 
// every functions are async! 

exports.get = async () => {  
    const res = await Simpleuser.find({ 
            active:true  
        }, 'cpf name email password reports notifications'); 
    return res;    
}  

exports.create = async (data) => { 
    var simpleuser = new Simpleuser(data); 
    await simpleuser.save(); 
}  

exports.update = async(id,data) => { 
    await Simpleuser   
    .findByIdAndUpdate(id, { 
        $set: {  
            // can update anything 
            cpf:data.cpf,  
            name: data.name,
            email: data.email
        }
    });
} 
exports.delete = async(id) => { 
    await Simpleuser.findByIdAndDelete(id);
}  


exports.getById = async(id) => { 
    const res = await Simpleuser 
        .findById(id)
    return res;    
} 