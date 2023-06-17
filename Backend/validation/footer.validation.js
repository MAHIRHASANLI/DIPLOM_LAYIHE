const Joi = require('joi')
const FooterSchema = Joi.object({
    url: Joi.string().required(),
    name: Joi.string()
    .min(3)
    .max(30)
    .required()
});
module.exports = FooterSchema;