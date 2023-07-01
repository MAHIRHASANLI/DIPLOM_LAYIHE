const RegisterSchema = require("../validation/register.validation");

const RegisterMiddleware = (req, res, next) => {
    const { error } = RegisterSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = RegisterMiddleware;