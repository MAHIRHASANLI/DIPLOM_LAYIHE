const Joi = require('joi')
const HomeSchema = Joi.object({
    url: Joi.string()
        .required(),
})
module.exports = HomeSchema;