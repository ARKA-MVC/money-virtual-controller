const pool = require("../../config/db.config.js");
const dailyWalletService = {};

dailyWalletService.createNewWallet = (name, amount, userId) => {
  const sql = `CALL procDailyWalletCreate("${name}", ${amount}, ${userId})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Daily Creating Failed"));
      }
      resolve("Continue");
    });
  });
};

dailyWalletService.getAllWallets = (userId) => {
  const sql = `CALL procDailyWalletGetAll(${userId})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot get all wallets"));
      }
      resolve(results);
    });
  });
};

dailyWalletService.getAllTransByTimeRange = (wallet, from, to) => {
  const walletType = wallet.charAt(0);
  const walletId = parseInt(wallet.substring(1));
  const sql = (() => {
    if (walletType === "d") {
      return `CALL procDailyTransByTimeRange(${walletId}, '${from}', '${to}')`;
    } else if (walletType === "s") {
      return `CALL procSavingTransByTimeRange(${walletId}, '${from}', '${to}')`;
    }
  })();
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot get all trans in time range"));
      }
      resolve(results);
    });
  });
};

dailyWalletService.deleteWallet = (id) => {
  const sql = `SET @message="";CALL procDailyWalletDelete(${id}, @message)`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot delete wallet"));
      }
      resolve("Success");
    });
  });
};

dailyWalletService.getTransSumByTimeRange = (userId, from, to) => {
  const sql = `CALL procDailyTransSumByCategory(${userId}, '${from}', '${to}')`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      console.log(err);
      if (err) {
        reject(new Error("Cannot get sum all trans in time range"));
      }
      resolve(results);
    });
  });
};

dailyWalletService.deleteTransById = (transId) => {
  const sql = `SET @message="";CALL procDailyTransDelete(${transId}, @message)`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot delete trans"));
      }
      resolve("Success");
    });
  });
};

module.exports = dailyWalletService;
