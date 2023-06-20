const mongoose = require('mongoose');

const FollowModel = new mongoose.model('following', new mongoose.Schema({
    url:  {
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

module.exports = FollowModel;