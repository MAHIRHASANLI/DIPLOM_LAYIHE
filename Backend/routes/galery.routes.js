const express = require('express');
const GalleryPostMiddleware = require('../middlewares/galery.middlewares');
const GalleryController = require('../controllers/galery.controller');
const gallery_router = express.Router();

gallery_router.get('/', GalleryController.GetAll);

gallery_router.post('/',GalleryPostMiddleware, GalleryController.PostById);

gallery_router.delete('/:id',GalleryPostMiddleware,GalleryController.DeleteById);

module.exports = gallery_router;