const FooterSchema = require("../validation/footer.validation");

const FooterPostMiddleware = (req, res, next) => {
    const { error } = FooterSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = FooterPostMiddleware;