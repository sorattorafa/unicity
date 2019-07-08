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

exports.update = async(id,data) => { 
    await Adminuser 
    .findOneAndUpdate(id, { 
        $set: {  
            // can update anything
            cpf: data.cpf,
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
}

exports.delete = async(id) => { 
    await Adminuser 
        .findOneAndRemove(id);
} 

exports.getByEmail = async(email) => { 
    const res = await Adminuser 
        .find({  
         email: email 
        }, 'email password')  
    return res;    
}

exports.getByCpf = async(cpf) => { 
    const res = await Adminuser 
        .find({  
         cpf: cpf 
        }, 'name email password')  
    return res;    
}

exports.getById = async(id) => { 
    const res = await Adminuser 
        .findById(id)
    return res;    
} 