const Joi = require('joi')
const OurteamSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    title: Joi.string()
        .min(3)
        .max(100)
        .required(),
    url: Joi.string()
        .required()
});
module.exports = OurteamSchema;