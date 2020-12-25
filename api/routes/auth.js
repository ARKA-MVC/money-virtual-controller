const express = require('express');
const logoutController = require('../controller/auth/logout.js');
const authRouter = express.Router();
const registerController = require('../controller/auth/register.js');

authRouter.post('/create', registerController.createNewUser);
authRouter.post('/logout', logoutController.logout);

module.exports = authRouter;
