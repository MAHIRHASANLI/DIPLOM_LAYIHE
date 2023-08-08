const mongoose = require('mongoose');

const BlogModel = new mongoose.model('blog', new mongoose.Schema({
    type: {
        type: String,
        trim: true,
        required: true,
    },
    time: {
        type: String,
        trim: true,
        required: true,
    },
    title:  {
        type: String,
        trim: true,
        required: true,
    },
    comment:  {
        type: String,
        trim: true,
        required: true,
    },
    url:  {
        type: String,
        trim: true,
        required: true,
    }
}))

module.exports = BlogModel