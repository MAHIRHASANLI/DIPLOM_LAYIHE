const LoginSchema = require("../validation/login.validation");

const LoginMiddleware = (req, res, next) => {
    const { error } = LoginSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = LoginMiddleware;