'use strict'; 
const mongoose = require('mongoose'); 
const City =  mongoose.model('City'); 


exports.get = async () => {  
    const res = await City.find({ 
            active:true  
        }, 'name state'); 
    return res;    
}  

exports.create = async (data) => { 
    var city = new City(data); 
    await city.save(); 
}  
 

exports.update = async(id,data) => { 
    await City   
    .findByIdAndUpdate(id, { 
        $set: {  
            // can update anything   
            name: data.name
        }
    });
} 
exports.delete = async(id) => { 
    await City.findByIdAndDelete(id);
}  

 