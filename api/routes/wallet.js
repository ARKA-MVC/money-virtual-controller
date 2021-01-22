const express = require("express");
const walletRouter = express.Router();
const dailyWalletController = require("../controller/wallet/dailyWallet.js");
const savingWalletController = require("../controller/wallet/savingWallet.js");
const walletController = require("../controller/wallet/wallet.js");

walletRouter.post("/common/create", walletController.createNewWalletByType);
walletRouter.get("/common/getall", walletController.getAllWallets);
walletRouter.post("/common/delete", walletController.deleteWalletByType);
walletRouter.post("/common/getSumAll", walletController.getSumAllTransByTimeRange);
walletRouter.get("/saving/find/:wallet_id", savingWalletController.getWallet);
walletRouter.post("/saving/create/", savingWalletController.createNewWallet);
walletRouter.post(
  "/saving/create/transaction/",
  savingWalletController.newTransaction
);
walletRouter.get(
  "/saving/statistic_now/:wallet_id",
  savingWalletController.statisticThisMonth
);
walletRouter.get(
  "/saving/statistic_past/:wallet_id",
  savingWalletController.statisticPast
);
walletRouter.get(
  "/saving/all_transactions/:wallet_id",
  savingWalletController.AllSavingTransThisMonth
);
walletRouter.get(
  "/saving/all_transactions_past/:wallet_id",
  savingWalletController.AllSavingPast
);

walletRouter.post("/saving/trans/delete", savingWalletController.deleteTransById)
walletRouter.post("/daily/trans/delete", dailyWalletController.deleteTransById)
walletRouter.post("/daily/getSum", dailyWalletController.getTransSumByTimeRange)
walletRouter.post("/saving/update", savingWalletController.updateWallet)
walletRouter.post("/daily/update", dailyWalletController.updateWallet)
// walletRouter.get('/saving/trans_by_type/:cat_type/:wallet_id', savingWalletController.TransactionByType)
module.exports = walletRouter;
