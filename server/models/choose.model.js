const mongoose = require('mongoose');

const ChooseModel = new mongoose.model('Choose', new mongoose.Schema({
    name: {
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

module.exports = ChooseModel;