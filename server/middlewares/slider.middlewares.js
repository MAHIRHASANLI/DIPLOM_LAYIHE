const SlidersSchema = require("../validation/slider.validation");

const SliderPostMiddleware = (req, res, next) => {
    const { error } = SlidersSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = SliderPostMiddleware;