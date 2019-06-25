'use strict'; 
const mongoose = require('mongoose');               // include db helper 
const Companyuser =  mongoose.model('Companyuser'); // include company user model
 
// every functions are async! 

// get all company users with name apresentation city street number and categories
exports.get = async () => {  
    const res = await Companyuser.find({},'name apresentation city street number categories email password').populate('categories'); 
    return res;    
}  

exports.getById = async(id) => { 
    const res = await Companyuser 
        .findById(id)
    return res;    
} 

exports.getByCity = async(city) => { 
    const res = await Companyuser 
        .find({  
            city: city 
        }, 'name apresentation categories')  
    return res;    
} 

exports.getByCategory = async (category) => { 
    const res = await Companyuser 
        .find({ 
            categories: category 
        }, 'name apresentation city categories') 
    return res;    
} 
exports.getByEmail = async(email) => { 
    const res = await Companyuser 
        .find({  
         email: email 
        }, 'email password')  
    return res;    
} 

exports.create = async (data) => { 
    var companyuser = new Companyuser(data); 
    await companyuser.save(); 
}  

exports.update = async(id,data) => { 
    await Companyuser 
    .findByIdAndUpdate(id, { 
        $set: {  
            // can update anything
            cnpj: data.cnpj,
            name: data.name,
            city: data.city,
            street: data.street,
            number: data.number, 
            email: data.email,
            apresentation: data.apresentation,
            password: data.password,
            categories: data.categories
        }
    });
} 

exports.delete = async(cnpj) => { 
    await Companyuser 
        .findOneAndRemove(cnpj);
}
