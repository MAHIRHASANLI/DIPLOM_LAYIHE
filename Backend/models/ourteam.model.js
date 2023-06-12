const mongoose = require('mongoose');

const OurteamModel = new mongoose.model('Ourteam', new mongoose.Schema({
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

module.exports = OurteamModel