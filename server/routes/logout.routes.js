const express = require('express');
const logout_router = express.Router();
const LogOutController = require('../controllers/logout.controller');

logout_router.get('/', LogOutController.PostLogOut);

module.exports = logout_router;