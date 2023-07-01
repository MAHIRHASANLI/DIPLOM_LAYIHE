const express = require('express');
const UsersController = require('../controllers/users.controller');
const users_router = express.Router();

users_router.get('/', UsersController.GetUsers);

module.exports=users_router;