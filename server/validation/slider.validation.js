const Joi = require('joi')
const SlidersSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    title: Joi.string()
        .min(3)
        .max(200)
        .required(),
    url: Joi.string()
        .required(),
        email: Joi.string().email({ tlds: { allow: false } })
});
module.exports = SlidersSchema;