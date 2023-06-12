const express = require('express');
const FooterController = require('../controllers/footer.controller');
const FooterPostMiddleware = require('../middlewares/footer.middlewares');
const footer_router = express.Router();

footer_router.get('/', FooterController.GetAll);

footer_router.post('/',FooterPostMiddleware, FooterController.PostById);

footer_router.delete('/:id', FooterController.DeleteById);

module.exports = footer_router;