const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    comments: [commentSchema],
    commentCount: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    imageUrl: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
