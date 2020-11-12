const express = require("express");
const router = express.Router();
const authRouter = require('./auth.js');

// All routers will be listed here

router.use('/auth', authRouter);

module.exports = router;
