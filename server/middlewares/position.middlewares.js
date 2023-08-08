const PositionSchema = require("../validation/position.validation");

const PositionPostMiddleware = (req, res, next) => {
    const { error } = PositionSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = PositionPostMiddleware;