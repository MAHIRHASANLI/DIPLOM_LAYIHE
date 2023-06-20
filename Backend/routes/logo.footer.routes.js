const express = require('express');
const LogoFooterController = require('../controllers/logo.footer.controller');
const LogoFooterPostMiddleware = require('../middlewares/logo.footer.middlewares');
const logo_router = express.Router();

logo_router.get('/', LogoFooterController.GetAll);

logo_router.post('/',LogoFooterPostMiddleware, LogoFooterController.PostById);

logo_router.put('/:id',LogoFooterPostMiddleware, LogoFooterController.PutById);

// logo_router.delete('/:id', LogoFooterController.DeleteById);


module.exports = logo_router;