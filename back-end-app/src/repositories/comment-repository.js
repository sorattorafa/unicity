'use strict';
const mongoose = require('mongoose');
const Comment =  mongoose.model('Comment');

// every functions are async!

exports.get = async () => {
    const res = await Comment.find({}, 'author createDate content comment_denunciations comment_supports').populate('author');
    return res;
}

exports.getById = async(id) => { 
    const res = await Comment 
        .findById(id)
    return res;    
}

exports.create = async (data) => {
    var comment = new Comment(data);
    await comment.save();
}

exports.delete = async(id) => {
    await Comment
        .findOneAndRemove(id);
}


exports.update = async(id,data) => { 
    await Category
    .findOneAndUpdate(id, {
        $set: {
            // can update anything
            description: data.content,
        }
    });
}
