const express = require('express');
const HomeController = require('../controllers/home.controller');
const HomePostMiddleware = require('../middlewares/home.middlewares');
const home_router = express.Router();

home_router.get('/', HomeController.GetAll);

home_router.get('/:id', HomeController.GetById);

home_router.put('/:id',HomePostMiddleware, HomeController.PutById);

module.exports = home_router;