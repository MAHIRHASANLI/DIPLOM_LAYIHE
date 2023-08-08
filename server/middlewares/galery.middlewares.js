const GallerySchema = require("../validation/gallery.validation")

const GalleryPostMiddleware = (req, res, next) => {
    const { error } = GallerySchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).joi(",");
        res.send({ message: message })
    }
}

module.exports = GalleryPostMiddleware;