'use strict'; 
const mongoose = require('mongoose'); 
const Report =  mongoose.model('Report');  
 
// every functions are async! 

exports.get = async () => {  
    const res = await Report.find({}, 'lat lng title description category street number solver comments').populate('category').populate('comments'); 
    return res;    
}  

exports.getById = async(id) => { 
    const res = await Report 
        .findById(id)
    return res;    
} 

exports.getBySimpleuser = async(id) => { 
    const res = await Report.find({simpleuser:id}, 'lat lng title description category street number').populate('category');
    return res;    
}  

exports.getByCategory = async(id) => { 
    const res = await Report.find({category:id}, 'lat lng title description category street number').populate('category');
    return res;    
}  

exports.getBySolver = async(id) => { 
    const res = await Report.find({solver:id}, 'lat lng title description category street number').populate('category');
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
            status: data.status, 
            solver: data.solver,
        }
    });
}  
exports.updatelike = async(id,num) => { 
    await Report   
    .findByIdAndUpdate(id, { 
        $set: {  
            // can update anything 
            number_of_supports: num,
        }
    });
} 
 

exports.updatedeslike = async(id,num) => { 
    await Report    
    .findByIdAndUpdate(id, { 
        $set: {  
            // can update anything 
            number_of_denunciations: num,
        }
    });
} 


exports.delete = async(id) => { 
    await Report.findByIdAndDelete(id);
}  
