const Joi = require('joi')
const BlogSchema = Joi.object({
    type: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    time: Joi.string()
        .min(3)
        .max(100)
        .required(),
    comment: Joi.string()
        .min(3)
        .max(100)
        .required(),
    url: Joi.string()
        .required(),
    title: Joi.string()
        .min(3)
        .max(200)
        .required(),
});
module.exports = BlogSchema;