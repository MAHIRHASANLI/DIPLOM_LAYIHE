const FollowinstagramSchema = require("../validation/followinstagram.validation");

const FollowinstagramPostMiddleware = (req, res, next) => {
    const { error } = FollowinstagramSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = FollowinstagramPostMiddleware;