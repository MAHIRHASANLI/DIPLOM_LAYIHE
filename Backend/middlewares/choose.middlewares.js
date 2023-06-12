const ChooseSchema = require("../validation/choose.validation");

const ChoosePostMiddleware = (req, res, next) => {
    const { error } = ChooseSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = ChoosePostMiddleware;