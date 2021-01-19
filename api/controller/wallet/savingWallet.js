const savingWalletService = require("../../service/wallet/savingWallet.js");
const savingWalletController = {};

//Hàm thực hiện tạo ví tiết kiệm
savingWalletController.createNewWallet = (req, res) => {
  const body = req.body;
  savingWalletService.createNewWallet(
    body.name,
    body.end_date,
    body.starting_amount,
    body.goal_amount,
    body.user_id,
    (err, results) => {
      if (err) {
        res.status(500).json({
          message: "Cannot create saving wallet",
        });
      } else {
        res.status(200).json({
          message: "Created new saving wallet successfully!",
        });
      }
    }
  );
};

//Tạo ra các giao dịch trong ví tiết kiệm
savingWalletController.newTransaction = (req, res) => {
  const body = req.body;
  savingWalletService.newTransaction(
    body.note,
    body.amount,
    body.category_id,
    body.saving_id,
    body.trans_time,
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

//Thống kê các giao dịch trong tháng này của ví tiết kiệm
savingWalletController.statisticThisMonth = (req, res) => {
  savingWalletService
    .getWallet(req.params.wallet_id)
    .then((results) => {
      console.log(results);
      return savingWalletService.statisticThisMonth(results[0].id);
    })
    .then((results) => {
      console.log(results);
      res.status(200).json({
        resutls: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

//Thống kê các giao dịch trong quá khứ của ví tiết kiệm
savingWalletController.statisticPast = (req, res) => {
  savingWalletService
    .getWallet(req.params.wallet_id)
    .then((results) => {
      console.log(results);
      return savingWalletService.statisticPast(results[0].id);
    })
    .then((results) => {
      console.log(results);
      res.status(200).json({
        resutls: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

//Trả về id của ví tiết kiệm
savingWalletController.getWallet = (req, res) => {
  savingWalletService
    .getWallet(req.params.wallet_id)
    .then((results) => {
      console.log(typeof results);
      console.log("0");
      res.status(200).json({
        results: results,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
      });
    });
};

//Liệt kê tất cả giao dịch của ví tiết kiệm trong tháng này
savingWalletController.AllSavingTransThisMonth = (req, res) => {
  savingWalletService
    .getWallet(req.params.wallet_id)
    .then((results) => {
      console.log(results);
      return savingWalletService.ListAllSavingTransThisMonth(results[0].id);
    })
    .then((results) => {
      console.log(results);
      res.status(200).json({
        resutls: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

//Liệt kê các giao dịch của ví tiết kiệm trong quá khứ
savingWalletController.AllSavingPast = (req, res) => {
  savingWalletService
    .getWallet(req.params.wallet_id)
    .then((results) => {
      console.log(results);
      return savingWalletService.ListAllSavingTransPast(results[0].id);
    })
    .then((results) => {
      console.log(results);
      res.status(200).json({
        resutls: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

savingWalletController.deleteWallet = (req, res) => {
  const id = req.body.id;
  savingWalletService
    .deleteWallet(parseInt(id))
    .then((results) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Cannot delete",
      });
    });
};

module.exports = savingWalletController;
