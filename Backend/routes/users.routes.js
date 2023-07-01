const express = require('express');
const UsersController = require('../controllers/users.controller');
const verifyJWT = require('../middlewares/verifyJWT.middlewares');
const users_router = express.Router();

users_router.get('/',verifyJWT, UsersController.GetUsers);

module.exports=users_router;