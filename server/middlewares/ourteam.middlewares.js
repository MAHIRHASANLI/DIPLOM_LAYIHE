const OurteamSchema = require("../validation/ourteam.validation");

const OurteamPostMiddleware = (req, res, next) => {
    const { error } = OurteamSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = OurteamPostMiddleware;