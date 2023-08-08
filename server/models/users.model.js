const mongoose = require('mongoose');
let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UsersModel = new mongoose.model('Users', new mongoose.Schema({
    username:{
        type: String,
        required:true,
        trim:true,
        minlength:5,
        unique:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required:true,
        trim:true,
        minlength:5,
    },
    isAdmin:{
        type:Boolean
    }
}))

module.exports = UsersModel;