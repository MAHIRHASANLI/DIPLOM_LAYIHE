const mongoose = require('mongoose');

const HomeModels = new mongoose.model('HomeModels', new mongoose.Schema({
    url:  {
        type: String,
        trim: true,
        required: true,
    }
}))

module.exports = HomeModels;