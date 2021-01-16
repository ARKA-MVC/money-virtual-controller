const pool = require("../../config/db.config.js");
const transactionService = {};

transactionService.createCollectTrans = (
  walletType,
  note,
  categoryId,
  walletId,
  amount,
  date
) => {
  const sql =
    walletType === "d"
      ? `SET @message='';` +
        `CALL procTransCollectCreate("${note}", ${categoryId}, ${walletId}, ${parseFloat(
          amount
        )}, "${date}", @message)`
      : `CALL procSavingTransCreate("${note}", ${parseInt(
          amount
        )}, ${categoryId}, ${walletId}, "${date}")`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Collect Insert Failed"));
      }
      resolve("Continue");
    });
  });
};

transactionService.createPayTrans = (
  walletType,
  note,
  categoryId,
  walletId,
  amount,
  date
) => {
  const sql =
    walletType === "d"
      ? `SET @message='';` +
        `CALL procTransPayCreate("${note}", ${categoryId}, ${walletId}, ${parseFloat(
          amount
        )}, "${date}", @message)`
      : `CALL procSavingTransCreate("${note}", ${parseInt(
          amount
        )}, ${categoryId}, ${walletId}, "${date}")`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Collect Insert Failed"));
      }
      resolve("Continue");
    });
  });
};

transactionService.createDebtTrans = (note, walletId, amount, date) => {
  const sql =
    `SET @message='';` +
    `CALL procTransDebtCreate("${note}", ${walletId}, ${parseFloat(
      amount
    )}, "${date}", @message)`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Collect Insert Failed"));
      }
      resolve("Continue");
    });
  });
};

transactionService.createLoanTrans = (note, walletId, amount, date) => {
  const sql =
    `SET @message='';` +
    `CALL procTransLoanCreate("${note}", ${walletId}, ${parseFloat(
      amount
    )}, "${date}", @message)`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Collect Insert Failed"));
      }
      resolve("Continue");
    });
  });
};

transactionService.createDebtCollectionTrans = (note, walletId, amount, date, toTrans) => {
  const sql =
    `SET @message='';` +
    `CALL procTransDebtCollectionCreate("${note}", ${walletId}, ${parseFloat(
      amount
    )}, "${date}", ${toTrans},@message)`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("DC Failed"));
      }
      resolve("Continue");
    });
  });
};

transactionService.createRepaymentTrans = (note, walletId, amount, date, toTrans) => {
  const sql =
    `SET @message='';` +
    `CALL procTransRepaymentCreate("${note}", ${walletId}, ${parseFloat(
      amount
    )}, "${date}", ${toTrans},@message)`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Repayment Failed"));
      }
      resolve("Continue");
    });
  });
};

transactionService.getToTransactions = (categoryId, walletId) => {
  console.log(walletId);
  const sql =
    categoryId === "DC-23"
      ? `CALL procTransLoanGet(${walletId})`
      : `CALL procTransDebtGet(${parseInt(walletId)})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Get Debt/Loan Trans Failed"));
      }
      resolve(results);
    });
  });
};

module.exports = transactionService;
