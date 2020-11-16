const express = require('express');
const walletRouter = express.Router();
const dailyWalletController = require('../controller/wallet/dailyWallet.js');

walletRouter.post('/daily/create/', dailyWalletController.createNewWallet);

module.exports = walletRouter;
