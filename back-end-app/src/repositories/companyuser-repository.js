'use strict'; 
const mongoose = require('mongoose');               // include db helper 
const Companyuser =  mongoose.model('Companyuser'); // include company user model
 
// every functions are async! 

// get all company users with name, apresentation, city and categories
exports.get = async () => {  
    const res = await Companyuser.find({},'name apresentation city categories'); 
    return res;    
}  

exports.create = async (data) => { 
    var companyuser = new Companyuser(data); 
    await companyuser.save(); 
}  

exports.update = async(id,data) => { 
    await Companyuser 
    .findOneAndUpdate(id, { 
        $set: {  
            // can update anything 
            city: data.city, 
            email: data.email,
            apresentation: data.apresentation,
            password: data.password
        }
    });
} 

exports.delete = async(cnpj) => { 
    await Companyuser 
        .findOneAndRemove(cnpj);
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