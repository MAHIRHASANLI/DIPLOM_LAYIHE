const HomeSchema = require("../validation/home.validation");

const HomePostMiddleware = (req, res, next) => {
    const { error } = HomeSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = HomePostMiddleware;