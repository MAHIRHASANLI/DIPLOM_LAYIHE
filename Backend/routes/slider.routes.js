const express = require('express');
const sliders_router = express.Router();
const SliderController = require('../controllers/slider.controller');
const SlidersSchema = require('../validation/slider.validation');

sliders_router.get('/', SliderController.GetAll);

sliders_router.post('/', SlidersSchema,SliderController.PostById);

sliders_router.put('/:id', SliderController.PutById);

sliders_router.delete('/:id', SliderController.DeleteById);

module.exports = sliders_router