const Joi = require('joi')
const FollowinstagramSchema = Joi.object({
    url: Joi.string().required(),
    count: Joi.string()
    .min(3)
    .max(20)
    .required()
});
module.exports = FollowinstagramSchema;