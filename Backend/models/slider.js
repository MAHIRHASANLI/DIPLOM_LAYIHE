const mongoose = require('mongoose');

const HomeSlider = new mongoose.model('HomeSlider', new mongoose.Model({
    name: String,
    tite: String,
    email: String,
    url: String
}))

module.exports = HomeSlider