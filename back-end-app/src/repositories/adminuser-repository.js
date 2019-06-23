'use strict'; 
const mongoose = require('mongoose'); 
const Adminuser =  mongoose.model('Adminuser');  
 
// every functions are async! 

exports.get = async () => {  
    const res = await Adminuser.find({}, 'cpf name email password'); 
    return res;    
}  

exports.create = async (data) => { 
    var adminuser = new Adminuser(data); 
    await adminuser.save(); 
}  

exports.update = async(cpf,data) => { 
    await Adminuser 
    .findOneAndUpdate(cpf, { 
        $set: {  
            // can update anything  
            email: data.email,
            password: data.password
        }
    });
} 
exports.delete = async(cpf) => { 
    await Adminuser 
        .findOneAndRemove(cpf);
} 

exports.getByEmail = async(email) => { 
    const res = await Adminuser 
        .find({  
         email: email 
        }, 'email password')  
    return res;    
} 