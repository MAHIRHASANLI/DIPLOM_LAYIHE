const express = require('express');
const RegisterController = require('../controllers/register.controller');
const register_router = express.Router();


register_router.post('/', RegisterController.PostUsers);

module.exports=register_router;