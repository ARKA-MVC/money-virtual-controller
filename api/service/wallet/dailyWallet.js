
const pool = require('../../config/db.config.js');
const dailyWalletService = {};

dailyWalletService.createNewWallet = (name, balance, user_id, callback) => {
    const sql = `CALL procDailyWallet('${name}', ${balance}, ${user_id})`;
    console.log(name)
    console.log(balance)
    console.log(user_id)

    pool.query(sql, (err, results) => {
        if (!err) {
            return callback(null, results);
        } else {
            console.log(err)
            return callback(err);
        }
    })
}

module.exports = dailyWalletService;
