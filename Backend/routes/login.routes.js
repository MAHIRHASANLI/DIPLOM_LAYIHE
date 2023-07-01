
const express = require('express');
const LoginController = require('../controllers/login.controller');
const LoginMiddleware = require('../middlewares/login.middlewares');
const login_router = express.Router();


login_router.post('/', LoginMiddleware, LoginController.PostUsers);

module.exports=login_router;