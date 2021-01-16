const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../controller/transaction/transaction.js");

transactionRouter.post("/create", transactionController.createNewTransaction);
transactionRouter.get("/getToTransactions", transactionController.getToTransactions);
// walletRouter.get('/saving/trans_by_type/:cat_type/:wallet_id', savingWalletController.TransactionByType)
module.exports = transactionRouter;
