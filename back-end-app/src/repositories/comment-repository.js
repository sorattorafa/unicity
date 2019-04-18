'use strict';
const mongoose = require('mongoose');
const Comment =  mongoose.model('Comment');

// every functions are async!

exports.get = async () => {
    const res = await Comment.find({}, 'author createDate description number_of_denunciations');
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
            description: data.description,
        }
    });
}
