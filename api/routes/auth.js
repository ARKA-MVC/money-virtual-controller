const express = require('express');
const authRouter = express.Router();
const registerController = require('../controller/auth/register.js');

authRouter.post('/create', registerController.createNewUser);

module.exports = authRouter;
