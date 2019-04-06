'use strict'; 
const mongoose = require('mongoose'); 
const Category =  mongoose.model('Category');  
 
// every functions are async! 

exports.get = async () => {  
    const res = await Category.find({ 
            active:true  
        }, 'id name description'); 
    return res;    
}  

exports.create = async (data) => { 
    var category = new Category(data); 
    await category.save(); 
}  

/*
exports.update = async(cpf) => { 
    await Simpleuser 
    .findByCpfAndUpdate(cpf, { 
        $set: {  
            // can update anything 
            numero: data.numero, 
            horario: data.horario 
        }
    });
} 
*/  
exports.delete = async(id) => { 
    await Category 
        .findOneAndRemove(id);
}