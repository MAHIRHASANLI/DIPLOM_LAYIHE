const express = require('express');
const choose_router = express.Router();
const ChooseController = require('../controllers/choose.controller');
const ChoosePostMiddleware = require('../middlewares/choose.middlewares');

choose_router.get('/', ChooseController.GetAll);

choose_router.post('/',ChoosePostMiddleware, ChooseController.PostById);

choose_router.put('/:id', ChooseController.PutById);

choose_router.delete('/:id', ChooseController.DeleteById);

module.exports = choose_router;