const mongoose = require('mongoose');

const PositionModel = new mongoose.model('position', new mongoose.Schema({
    about: {
        type: String,
        trim: true,
        required: true,
    },
    title:  {
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

module.exports = PositionModel;