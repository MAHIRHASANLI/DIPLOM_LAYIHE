const express = require('express');
const FollowInstagramController = require('../controllers/followinstagram.controllers');
const FollowinstagramPostMiddleware = require('../middlewares/followinstagram.middlewares');
const followinginstagram_router = express.Router();

followinginstagram_router.get('/', FollowInstagramController.GetAll);

followinginstagram_router.get('/:id', FollowInstagramController.GetById);

followinginstagram_router.post('/',FollowinstagramPostMiddleware, FollowInstagramController.PostById);

followinginstagram_router.put('/:id',FollowinstagramPostMiddleware, FollowInstagramController.PutById);

followinginstagram_router.delete('/:id', FollowInstagramController.DeleteById);

module.exports = followinginstagram_router;