const mongoose = require('mongoose');

const LogoFooterModel = new mongoose.model('Logo', new mongoose.Schema({
    url:  {
        type: String,
        trim: true,
        required: true,
    },
    urlblack:  {
        type: String,
        trim: true,
        required: true,
    },
    count: {
        type: String,
        trim: true,
        required: true,
    }
}))

module.exports = LogoFooterModel;