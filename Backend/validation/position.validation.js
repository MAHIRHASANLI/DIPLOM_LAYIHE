const Joi = require('joi');

const PositionSchema = Joi.object({
    about: Joi.string().min(3)
    .max(200)
    .required(),
    title: Joi.string()
    .min(3)
    .max(200)
    .required(),
    url: Joi.string()
    .required()
})
module.exports = PositionSchema;