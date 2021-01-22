const dailyWalletService = require("../../service/wallet/dailyWallet.js");
const dailyWalletController = {};

dailyWalletController.createNewWallet = (req, res) => {
  const body = req.body;
  dailyWalletService.createNewWallet(
    body.name,
    body.balance,
    body.user_id,
    (err, results) => {
      if (err) {
        res.status(500).json({
          message: "Cannot create user",
        });
      } else {
        res.status(200).json({
          message: "Created new user successfully!",
        });
      }
    }
  );
};

dailyWalletController.deleteWallet = (req, res) => {
  const id = req.body.id;
  dailyWalletService
    .deleteWallet(parseInt(id))
    .then((results) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Cannot delete wallet",
      });
    });
};

dailyWalletController.deleteTransById = (req, res) => {
  const transId = req.body.transId;
  dailyWalletService
    .deleteTransById(parseInt(transId))
    .then((results) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Cannot delete trans",
      });
    });
};

dailyWalletController.getTransSumByTimeRange = (req, res) => {
  const userId = req.session.currentUser.id;
  dailyWalletService
    .getTransSumByTimeRange(parseInt(userId), req.body.from, req.body.to)
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
}

dailyWalletController.updateWallet = (req, res) => {
  const wid = req.body.id;
  const wname = req.body.name;
  const amount = req.body.amount;
  dailyWalletService
    .updateWallet(parseInt(wid), parseInt(amount), wname)
    .then((results) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Cannot delete trans",
      });
    });
};

module.exports = dailyWalletController;
