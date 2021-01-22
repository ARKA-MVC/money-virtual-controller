const pool = require("../../config/db.config.js");
const savingWalletService = {};

savingWalletService.createNewWallet = (
  name,
  end_date,
  starting_amount,
  goal_amount,
  user_id
) => {
  const sql = `CALL procSavingWalletCreate('${name}', '${end_date}', ${starting_amount}, ${goal_amount}, ${user_id})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Saving Creating Failed"));
      }
      resolve("Continue");
    });
  });
};

savingWalletService.getAllWallets = (userId) => {
  const sql = `CALL procSavingWalletGetAll(${userId})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot get all wallets"));
      }
      resolve(results);
    });
  });
}

savingWalletService.newTransaction = (
  note,
  amount,
  category_id,
  saving_id,
  trans_time,
  callback
) => {
  const sql = `CALL procCreateTransSavingWallet('${note}', ${amount}, ${category_id}, ${saving_id}, '${trans_time}')`;

  pool.query(sql, (err, results) => {
    if (!err) {
      console.log(results);
      return callback(null, results);
    } else {
      console.log(results);
      console.log(err);
      return callback(err);
    }
  });
};

savingWalletService.statisticThisMonth = (saving_id) => {
  const sql = `CALL procStatisticSavingThisMonth1(${saving_id})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(new Error("Something went wrong"));
      }
      if (Object.keys(results).length === 0) {
        reject(new Error("404 ERROR"));
      }
      resolve(results);
    });
  });
};

savingWalletService.statisticPast = (saving_id) => {
  const sql = `CALL procStatisticSavingPast(${saving_id})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(new Error("Something went wrong"));
      }
      if (Object.keys(results).length === 0) {
        reject(new Error("404 ERROR"));
      }
      resolve(results);
    });
  });
};

savingWalletService.getWallet = (saving_id) => {
  const sql = `SELECT * FROM SavingWallet WHERE id = ${saving_id}`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Không tìm được ví"));
      }
      if (Object.keys(results).length === 0) {
        reject(new Error("Không tìm được Id"));
      }
      resolve(results);
    });
  });
};

savingWalletService.getCategory = (cat_type) => {
  const sql = `CALL procGetCategory('${cat_type}')`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Something went wrong"));
      }
      if (Object.keys(results).length === 0) {
        reject(new Error("Không tìm được Id"));
      }
      resolve(results);
    });
  });
};

savingWalletService.ListAllSavingTransThisMonth = (wallet_id) => {
  const sql = `CALL procAllTransactionSavingWallet(${wallet_id})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Something went wrong"));
      }
      if (Object.keys(results).length === 0) {
        reject(new Error("Không tìm được Id"));
      }
      resolve(results);
    });
  });
};

savingWalletService.ListAllSavingTransPast = (wallet_id) => {
  const sql = `CALL procAllTransSavingPast(${wallet_id})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Something went wrong"));
      }
      if (Object.keys(results).length === 0) {
        reject(new Error("Không tìm được Id"));
      }
      resolve(results);
    });
  });
};

savingWalletService.TransactionByCategory = (cat_type, w_id) => {
  const sql = `CALL procSavingTransByCat(${cat_type}, ${w_id})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(new Error("Something went wrong"));
      }
      if (Object.keys(results).length === 0) {
        reject(new Error("Không tìm được id"));
      }
      resolve(results);
    });
  });
};

savingWalletService.deleteWallet = (id) => {
  const sql = `CALL procSavingWalletDelete(${id})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot delete wallet"));
      }
      resolve("Success");
    });
  });
};

savingWalletService.getTransSumByTimeRange = (userId, from, to) => {
  const sql = `CALL procSavingTransSumByCategory(${userId}, '${from}', '${to}')`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      console.log(err)
      if (err) {
        reject(new Error("Cannot get sum all trans in time range"));
      }
      resolve(results);
    });
  });
}

savingWalletService.deleteTransById = (transId) => {
  const sql = `CALL procSavingTransDelete(${transId})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      console.log(err)
      if (err) {
        reject(new Error("Cannot del saving trans"));
      }
      resolve(results);
    });
  });
}

savingWalletService.updateWallet = (wid, wgoal, wendDate, wcur, wname) => {
  console.log(wcur)
  const sql = `CALL procSavingWalletEdit('${wname}', ${wgoal}, '${wendDate}', ${wcur}, ${wid})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      console.log(err)
      if (err) {
        reject(new Error("Cannot update saving wallet"));
      }
      resolve("Success");
    });
  });
}

module.exports = savingWalletService;
