const Joi = require('joi')
const ChooseSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    title: Joi.string()
        .min(3)
        .max(150)
        .required(),
    url: Joi.string()
        .required()
});
module.exports = ChooseSchema;