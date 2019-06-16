'use strict'; 
const mongoose = require('mongoose'); 
const Category =  mongoose.model('Category');  
 
// every functions are async! 

exports.get = async () => {  
    const res = await Category.find({}, 'id name description label'); 
    return res;    
}  

exports.create = async (data) => { 
    var category = new Category(data); 
    await category.save(); 
}  

exports.delete = async(id) => { 
    await Category 
        .findOneAndRemove(id);
} 


exports.update = async(name,data) => { 
    await Category 
    .findOneAndUpdate(name, { 
        $set: {  
            // can update anything 
            description: data.description,
        }
    });
}  
exports.getById = async(id) => { 
    const res = await Category 
        .findById(id)
    return res;    
} 
