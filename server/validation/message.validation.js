const Joi = require('joi')
const MessageSchema = Joi.object({
    name: Joi.string()
    .min(5)
    .required(),
    surname: Joi.string()
    .min(5)
    .required(),
    comment: Joi.string()
    .min(10).max(200)
    .required(),
    email: Joi.string().email({ tlds: { allow: false } })
});
module.exports = MessageSchema;