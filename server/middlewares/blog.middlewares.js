const BlogSchema = require("../validation/blog.validation");

const BlogPostMiddleware = (req, res, next) => {
    const { error } = BlogSchema.validate(req.body);
    if (error === undefined) {
        next()
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        res.send({ message: message })
    }
}
module.exports = BlogPostMiddleware;