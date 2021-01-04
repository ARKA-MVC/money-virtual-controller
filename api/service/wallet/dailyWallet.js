
const pool = require('../../config/db.config.js');
const dailyWalletService = {};

dailyWalletService.createNewWallet = (name, amount, userId) => {
    const sql = `CALL procDailyWalletCreate("${name}", ${amount}, ${userId})`;
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, results) => {
        console.log(results);
        if (err) {
          reject(new Error("Daily Creating Failed"));
        }
        resolve("Continue");
      });
    });
  };

module.exports = dailyWalletService;
