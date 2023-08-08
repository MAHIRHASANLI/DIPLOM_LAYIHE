const UsersModel = require("../models/users.model")

const UsersController = {
    GetUsers:async(req,res)=>{
        const GettAll = await UsersModel.find();
        res.send({
            data:GettAll,
            message:"data get successfully! "
        });
    },
}

module.exports = UsersController;