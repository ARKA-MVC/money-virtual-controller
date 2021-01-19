const transactionService = require("../../service/transaction/transaction");
const dailyWalletService = require("../../service/wallet/dailyWallet");
const walletController = require("../wallet/wallet");

const transactionController = {};

transactionController.createNewTransaction = (req, res) => {
  const categoryType = req.body.categoryType;
  switch (categoryType) {
    case "DC":
      return transactionController.createDebtCollectTrans(req, res);
    case "L":
      return transactionController.createLoanTrans(req, res);
    case "D":
      return transactionController.createDebtTrans(req, res);
    case "R":
      return transactionController.createRepaymentTrans(req, res);
    case "P":
      return transactionController.createPayTrans(req, res);
    default:
      return transactionController.createCollectTrans(req, res);
  }
};

transactionController.createCollectTrans = (req, res) => {
  const body = req.body;
  transactionService
    .createCollectTrans(
      body.walletType,
      body.note,
      body.categoryId,
      body.walletId,
      body.amount,
      body.transactionTime
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
};

transactionController.createPayTrans = (req, res) => {
  const body = req.body;
  transactionService
    .createPayTrans(
      body.walletType,
      body.note,
      body.categoryId,
      body.walletId,
      body.amount,
      body.transactionTime
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
};

transactionController.createRepaymentTrans = (req, res) => {
  const body = req.body;
  transactionService
    .createRepaymentTrans(
      body.note,
      body.walletId,
      body.amount,
      body.transactionTime,
      body.toTransaction
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
};

transactionController.createLoanTrans = (req, res) => {
  const body = req.body;
  transactionService
    .createLoanTrans(
      body.note,
      body.walletId,
      body.amount,
      body.transactionTime
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
};

transactionController.createDebtCollectTrans = (req, res) => {
  const body = req.body;
  transactionService
    .createDebtCollectionTrans(
      body.note,
      body.walletId,
      body.amount,
      body.transactionTime,
      body.toTransaction
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
};

transactionController.createDebtTrans = (req, res) => {
  const body = req.body;
  transactionService
    .createDebtTrans(
      body.note,
      body.walletId,
      body.amount,
      body.transactionTime
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
};

transactionController.getToTransactions = (req, res) => {
  const categoryId = req.query.categoryId;
  const walletId = req.query.walletId;
  transactionService
    .getToTransactions(categoryId, walletId)
    .then((results) => {
      res.status(200).json({
        results: results[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

transactionController.getAllTransByTimeRange = (req, res) => {
  const wallet = req.query.walletId;
  const from = req.query.from;
  const to = req.query.to;
  if (wallet !== "all") {
    dailyWalletService
      .getAllTransByTimeRange(wallet, from, to)
      .then((results) => {
        res.status(200).json({ results: results });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  } else {
    walletController.getAllTransByTimeRange(req, res);
  }
};

module.exports = transactionController;
