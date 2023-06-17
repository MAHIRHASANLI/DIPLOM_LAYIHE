const mongoose = require('mongoose');

const FooterModel = new mongoose.model('Footer', new mongoose.Schema({
    url:  {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    }
}))

module.exports = FooterModel;