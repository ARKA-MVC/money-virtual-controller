const express = require('express');
const loginController = require('../controller/auth/login.js');
const logoutController = require('../controller/auth/logout.js');
const authRouter = express.Router();
const registerController = require('../controller/auth/register.js');

authRouter.post('/create', registerController.createNewUser);
authRouter.post('/logout', logoutController.logout);
authRouter.post('/login', loginController.login)
authRouter.post('/is-login', loginController.isLogin)


module.exports = authRouter;
