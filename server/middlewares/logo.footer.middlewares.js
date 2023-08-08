const LogoFooterSchema = require("../validation/logo.footer.validation");

const LogoFooterPostMiddleware = (req, res, next) => {
    const { error } = LogoFooterSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = LogoFooterPostMiddleware;