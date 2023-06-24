const Joi = require('joi')
const HomeSchema = Joi.object({
    url: Joi.string().uri()
    .required()
})
module.exports = HomeSchema;