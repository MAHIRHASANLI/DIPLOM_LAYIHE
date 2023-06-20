const Joi = require('joi')
const ContactSchema = Joi.object({
    address: Joi.string()
        .min(3)
        .required(),
    mobile: Joi.number().min(5)
        .max(20)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'az'] } })
});
module.exports = ContactSchema;