const express = require("express");
const transactionRouter = express.Router();
const transactionController = require("../controller/transaction/transaction.js");

transactionRouter.post("/create", transactionController.createNewTransaction);
transactionRouter.get("/getToTransactions", transactionController.getToTransactions);
transactionRouter.get("/getAllTransByTime", transactionController.getAllTransByTimeRange);

module.exports = transactionRouter;
