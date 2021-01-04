const savingWalletService = require("../../service/wallet/savingWallet.js");
const dailyWalletService = require("../../service/wallet/dailyWallet");
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
  }
};

module.exports = walletController;
