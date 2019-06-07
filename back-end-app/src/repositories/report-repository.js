'use strict'; 
const mongoose = require('mongoose'); 
const Report =  mongoose.model('Report');  
 
// every functions are async! 

exports.get = async () => {  
    const res = await Report.find({ 
            status:0  
        }, 'lat lng '); 
    return res;    
}  

exports.create = async (data) => { 
    var report = new Report(data); 
    await report.save(); 
}  

exports.update = async(id,data) => { 
    await Report   
    .findByIdAndUpdate(id, { 
        $set: {  
            // can update anything 
            cep:data.cep,  
            street: data.street,
            number: data.number
        }
    });
} 
exports.delete = async(id) => { 
    await Report.findByIdAndDelete(id);
}  


exports.getById = async(id) => { 
    const res = await Report 
        .findById(id)
    return res;    
} 