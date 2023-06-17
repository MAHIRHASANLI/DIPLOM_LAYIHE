const express = require('express');
const ourteam_router = express.Router();
const OurteamController = require('../controllers/ourteam.controller');
const OurteamPostMiddleware = require('../middlewares/ourteam.middlewares');

ourteam_router.get('/', OurteamController.GetAll);

ourteam_router.get('/:id', OurteamController.GetById);

ourteam_router.post('/',OurteamPostMiddleware, OurteamController.PostById);

ourteam_router.put('/:id', OurteamController.PutById);

ourteam_router.delete('/:id', OurteamController.DeleteById);

module.exports = ourteam_router;