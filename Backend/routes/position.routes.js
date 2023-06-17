const express = require('express');
const possion_router = express.Router();
const PositionController = require('../controllers/position.controllers');
const PositionPostMiddleware = require('../middlewares/position.middlewares');

possion_router.get('/', PositionController.GetAll);

possion_router.get('/:id', PositionController.GetById);

possion_router.post('/',PositionPostMiddleware, PositionController.PostById);

possion_router.put('/:id', PositionController.PutById);

possion_router.delete('/:id', PositionController.DeleteById);

module.exports = possion_router;