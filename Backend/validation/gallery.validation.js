const Joi = require('joi');

const GallerySchema = Joi.object({
    url: Joi.string().required(),
    category: Joi.string().required()
})

module.exports = GallerySchema;