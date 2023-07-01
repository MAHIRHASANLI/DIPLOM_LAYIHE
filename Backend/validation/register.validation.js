const Joi = require('joi')
const RegisterSchema = Joi.object({
    username: Joi.string()
        .min(5)
        .required(),
    password: Joi.string()
        .min(5)
        .required(),
    email: Joi.string().email({ tlds: { allow: false } })
});
module.exports = RegisterSchema;