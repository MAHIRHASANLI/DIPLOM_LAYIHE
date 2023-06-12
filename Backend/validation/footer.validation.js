const Joi = require('joi')
const FooterSchema = Joi.object({
    url: Joi.string()
        .required()
});
module.exports = FooterSchema;