const UsersModel = require("../models/users.model")
const bcrypt = require('bcrypt');

const RegisterController = {
    PostUsers:async(req,res)=>{
        const {username, email, password} = req.body;
        const existedUsername = await UsersModel.findOne({username:username});
        const existedemail = await UsersModel.findOne({email:email});

        if(existedUsername){
            res.send({
                message:'USERNAME already exists!'
            })
            return
        }
        if(existedemail){
            res.send({
                message:'EMAIL already used!'
            })
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await UsersModel({
            username:username,
            email:email,
            password:hashedPassword,
            isAdmin:false
        })
        await newUser.save()
        res.send({
            data:newUser,
            message:'USER signed up successfully!!'
        })
    }
}

module.exports = RegisterController;