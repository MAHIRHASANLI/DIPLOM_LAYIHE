const Joi = require('joi')
const ContactSchema = Joi.object({
    maps: Joi.string()
    .min(3)
    .required(),
    address: Joi.string()
        .min(3)
        .required(),
    mobile: Joi.string().min(5)
        .max(20)
        .required(),
        email: Joi.string().email({ tlds: { allow: false } })
});
module.exports = ContactSchema;