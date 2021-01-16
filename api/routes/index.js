const express = require("express");
const router = express.Router();
const walletRouter = require("./wallet.js");
const authRouter = require("./auth.js");
const categoryRouter = require("./category.js");
const transactionRouter = require("./transaction.js");

// All routers will be listed here

router.use("/auth", authRouter);
router.use("/wallet", walletRouter);
router.use("/category", categoryRouter);
router.use("/trans", transactionRouter)

module.exports = router;
