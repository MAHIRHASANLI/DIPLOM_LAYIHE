
const express = require('express');
const LoginController = require('../controllers/login.controller');
const login_router = express.Router();


login_router.post('/', LoginController.PostUsers);

module.exports=login_router;