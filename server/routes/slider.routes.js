const express = require('express');
const sliders_router = express.Router();
const SliderController = require('../controllers/slider.controller');
const SliderPostMiddleware = require('../middlewares/slider.middlewares');

sliders_router.get('/', SliderController.GetAll);

sliders_router.get('/:id', SliderController.GetById);

sliders_router.post('/',SliderPostMiddleware, SliderController.PostById);

sliders_router.put('/:id',SliderPostMiddleware, SliderController.PutById);

sliders_router.delete('/:id', SliderController.DeleteById);

module.exports = sliders_router;