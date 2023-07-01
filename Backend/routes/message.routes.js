const express = require('express');
const message_router = express.Router();
const MessageController = require('../controllers/message.controller');
const MessagePostMiddleware = require('../middlewares/message.midlevare');

message_router.get('/', MessageController.GetAll);

message_router.post('/',MessagePostMiddleware, MessageController.PostById);

message_router.delete('/:id', MessageController.DeleteById);

module.exports = message_router;