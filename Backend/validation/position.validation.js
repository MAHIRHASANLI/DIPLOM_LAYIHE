const Joi = require('joi');

const PositionSchema = Joi.object({
    about: Joi.string().min(3)
    .max(30)
    .required(),
    title: Joi.string()
    .min(3)
    .max(200)
    .required(),
    url: Joi.string()
    .required(),
    img: Joi.string()
    .required()
})
module.exports = PositionSchema;