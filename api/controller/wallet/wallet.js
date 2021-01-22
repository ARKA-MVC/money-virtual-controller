const savingWalletService = require("../../service/wallet/savingWallet.js");
const dailyWalletService = require("../../service/wallet/dailyWallet");
const walletsService = require("../../service/wallet/wallets.js");
const dailyWalletController = require("./dailyWallet.js");
const savingWalletController = require("./savingWallet.js");
const walletController = {};

walletController.createNewWalletByType = (req, res) => {
  const wallet = req.body;
  const userId = req.session.currentUser.id;
  console.log(wallet.type);
  console.log(userId);
  if (wallet.type === "0") {
    dailyWalletService
      .createNewWallet(wallet.name, parseFloat(wallet.amount), parseInt(userId))
      .then((results) => {
        res.status(200).json({
          message: "success",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  } else {
    savingWalletService
      .createNewWallet(
        wallet.name,
        wallet.endingDate,
        parseFloat(wallet.startingAmount),
        parseFloat(wallet.goalAmount),
        parseInt(userId)
      )
      .then((results) => {
        res.status(200).json({
          message: "success",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  }
};

walletController.getAllWallets = (req, res) => {
  const userId = req.session.currentUser.id;
  Promise.all([
    dailyWalletService.getAllWallets(parseInt(userId)),
    savingWalletService.getAllWallets(parseInt(userId)),
  ])
    .then((results) => {
      res.status(200).json({
        data: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

walletController.getAllTransByTimeRange = (req, res) => {
  const userId = req.session.currentUser.id;
  const from = req.query.from;
  const to = req.query.to;
  walletsService
    .getAllTransByTimeRange(userId, from, to)
    .then((results) => {
      res.status(200).json({
        results: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

walletController.getSumAllTransByTimeRange = (req, res) => {
  const userId = req.session.currentUser.id;
  walletsService
    .getSumAllTransByTimeRange(parseInt(userId), req.body.from, req.body.to)
    .then((results) => {
      res.status(200).json({
        results: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

walletController.deleteWalletByType = (req, res) => {
  const type = req.body.type;
  if (type === "daily") {
    dailyWalletController.deleteWallet(req, res);
  } else {
    savingWalletController.deleteWallet(req, res);
  }
};

module.exports = walletController;
