const express = require('express');
const blog_router = express.Router();
const BlogController = require('../controllers/blog.controller');
const BlogPostMiddleware = require('../middlewares/blog.middlewares');

blog_router.get('/', BlogController.GetAll);

blog_router.get('/:id', BlogController.GetById);

blog_router.post('/',BlogPostMiddleware, BlogController.PostById);

blog_router.put('/:id', BlogController.PutById);

blog_router.delete('/:id', BlogController.DeleteById);

module.exports = blog_router;