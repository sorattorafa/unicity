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

exports.update = async(cpf,data) => { 
    await Simpleuser 
    .findOneAndUpdate(cpf, { 
        $set: {  
            // can update anything  
            email: data.email,
            password: data.password
        }
    });
} 
exports.delete = async(cpf) => { 
    await Simpleuser 
        .findOneAndRemove(cpf);
}