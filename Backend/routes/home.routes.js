const express = require('express');
const HomeController = require('../controllers/home.controller');
const HomePostMiddleware = require('../middlewares/home.middlewares');
const home_router = express.Router();

home_router.get('/', HomeController.GetAll);

home_router.put('/:id',HomePostMiddleware, HomeController.PutById);

home_router.post('/', HomePostMiddleware,HomeController.PostById);
home_router.delete('/:id', HomeController.DeleteById);
module.exports = home_router;