const Joi = require('joi')
const LogoFooterSchema = Joi.object({
    url: Joi.string().required(),
    urlblack: Joi.string().required(),
    count: Joi.string()
    .min(3)
    .max(150)
    .required()
});
module.exports = LogoFooterSchema;