const express = require('express');
const walletRouter = express.Router();
const dailyWalletController = require('../controller/wallet/dailyWallet.js');
const savingWalletController = require('../controller/wallet/savingWallet.js');

walletRouter.get('/saving/find/:wallet_id', savingWalletController.getWallet)
walletRouter.post('/saving/create/', savingWalletController.createNewWallet);
walletRouter.post('/saving/create/transaction/', savingWalletController.newTransaction)
walletRouter.get('/saving/:wallet_id', savingWalletController.statisticThisMonth)
module.exports = walletRouter;
