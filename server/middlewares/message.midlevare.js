const MessageSchema = require("../validation/message.validation");

const MessagePostMiddleware = (req, res, next) => {
    const { error } = MessageSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = MessagePostMiddleware;