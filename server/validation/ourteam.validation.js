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
    url: Joi.string().uri()
        .required(),
    twitter: Joi.string()
        .uri()
        .required(),
    facebook: Joi.string()
        .uri()
        .required(),
    linkedn: Joi.string().uri()
        .required(),
    pinterest: Joi.string().uri()
        .required()
});
module.exports = OurteamSchema;