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

module.exports = dailyWalletController;
