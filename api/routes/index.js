const express = require("express");
const router = express.Router();
const walletRouter = require('./wallet.js');
const authRouter = require('./auth.js');

// All routers will be listed here

router.use('/auth', authRouter);
router.use('/wallet', walletRouter);

module.exports = router;
