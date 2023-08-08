const express = require('express');
const RegisterController = require('../controllers/register.controller');
const RegisterMiddleware = require('../middlewares/register.middlewares');
const register_router = express.Router();


register_router.post('/',RegisterMiddleware, RegisterController.PostUsers);

module.exports=register_router;