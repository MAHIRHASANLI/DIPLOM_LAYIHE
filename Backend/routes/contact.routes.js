const express = require('express');
const contact_router = express.Router();
const ContactController = require('../controllers/contact.controllers');
const ContactPostMiddleware = require('../middlewares/contact.middlewares');

contact_router.get('/', ContactController.GetAll);

contact_router.post('/',ContactPostMiddleware, ContactController.PostById);

contact_router.put('/:id', ContactPostMiddleware,ContactController.PutById);

contact_router.delete('/:id', ContactController.DeleteById);

module.exports = contact_router;