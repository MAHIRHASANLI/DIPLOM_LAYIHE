const UsersModel = require("../models/users.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const LoginController = {
    PostUsers: async (req, res) => {
        const { username, password } = req.body;
        const existedUsername = await UsersModel.findOne({ username: username });

        if (!existedUsername) {
            res.send({
                auth: false,
                message: 'USERNAME not Found!'
            })
        } else {
            const isValid = await bcrypt.compare(password, existedUsername.password);
            if (!isValid) {
                res.send({ auth: false, message: 'PASSWORD is incorrect!' });
            } else {
                //username, password ++
                const id = existedUsername._id;
               const token = jwt.sign({id}, process.env.SECRET_KEY, {
                    expiresIn: '1d'
                })
                res.send({
                    auth: true,
                    user: {
                        id: existedUsername._id,
                        username: existedUsername.username,
                        email: existedUsername.email,
                        isAdmin: existedUsername.isAdmin
                    },
                    token:token,
                    message: 'USER logged in successfully!'
                })
            }
        }

    }
}

module.exports = LoginController;

