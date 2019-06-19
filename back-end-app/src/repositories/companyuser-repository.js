'use strict'; 
const mongoose = require('mongoose');               // include db helper 
const Companyuser =  mongoose.model('Companyuser'); // include company user model
 
// every functions are async! 

// get all company users with name apresentation city street number and categories
exports.get = async () => {  
<<<<<<< HEAD
    const res = await Companyuser.find({},'name apresentation city street number email category'); 
=======
    const res = await Companyuser.find({},'name apresentation city street number categories'); 
>>>>>>> bfb54040cdf5fa94948f9a0f35e11e1bad9d3c6c
    return res;    
}  

exports.create = async (data) => { 
    var companyuser = new Companyuser(data); 
    await companyuser.save(); 
}  

exports.update = async(cnpj,data) => { 
    await Companyuser 
    .findOneAndUpdate(cnpj, { 
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
exports.getByEmail = async(email) => { 
    const res = await Companyuser 
        .find({  
         email: email 
        }, 'email password')  
    return res;    
} 

