const mongoose = require('mongoose');

const GalleryModel = new mongoose.model('Gallery', new mongoose.Schema({
    url:  {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        trim: true,
        required: true,
    }
}))

module.exports = GalleryModel;