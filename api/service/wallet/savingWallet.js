
const pool = require('../../config/db.config.js');
const savingWalletService = {};

savingWalletService.createNewWallet = (name, end_date, starting_amount, goal_amount, user_id, callback) => {
    const sql = `CALL procCreateSavingWallet('${name}', '${end_date}', ${starting_amount}, ${goal_amount}, ${user_id})`;
    console.log(name)
    console.log(end_date)
    console.log(starting_amount)
    console.log(goal_amount)
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

savingWalletService.newTransaction = (note, amount, category_id, saving_id, trans_time, callback) =>{
    const sql = `CALL procCreateTransSavingWallet('${note}', ${amount}, ${category_id}, ${saving_id}, '${trans_time}')`;

    pool.query(sql, (err, results) => {
        if (!err) {
            console.log(results)
            return callback(null, results);
        } else {
            console.log(results)
            console.log(err)
            return callback(err);
        }
    })
}

savingWalletService.statisticThisMonth = (saving_id) =>{
    const sql = `CALL procStatisticSavingThisMonth1(${saving_id})`;
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results)=>{
            if(err){
                return reject(new Error("Something went wrong"))
            }
            if (Object.keys(results).length === 0){
                reject(new Error("404 ERROR"))
            }
            resolve(results)
        })
    })
}

savingWalletService.statisticPast = (saving_id) =>{
    const sql = `CALL procStatisticSavingPast(${saving_id})`;
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results)=>{
            if(err){
                return reject(new Error("Something went wrong"))
            }
            if (Object.keys(results).length === 0){
                reject(new Error("404 ERROR"))
            }
            resolve(results)
        })
    })
}

savingWalletService.getWallet = (saving_id) => {
    const sql = `SELECT * FROM SavingWallet WHERE id = ${saving_id}`;
    return new Promise ((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                reject(new Error("Không tìm được ví"))
            }
            if (Object.keys(results).length === 0){
                reject(new Error("Không tìm được Id"))
            }
            resolve(results)
        })
    })
}

savingWalletService.getCategory = (cat_type) => {
    const sql = `CALL procGetCategory('${cat_type}')`;
    return new Promise ((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                reject(new Error("Something went wrong"))
            }
            if (Object.keys(results).length === 0){
                reject(new Error("Không tìm được Id"))
            }
            resolve(results)
        })
    })
}

savingWalletService.ListAllSavingTransThisMonth = (wallet_id) => {
    const sql = `CALL procAllTransactionSavingWallet(${wallet_id})`;
    return new Promise ((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                reject(new Error("Something went wrong"))
            }
            if (Object.keys(results).length === 0){
                reject(new Error("Không tìm được Id"))
            }
            resolve(results)
        })
    })
}

savingWalletService.ListAllSavingTransPast = (wallet_id) => {
    const sql = `CALL procAllTransSavingPast(${wallet_id})`;
    return new Promise ((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                reject(new Error("Something went wrong"))
            }
            if (Object.keys(results).length === 0){
                reject(new Error("Không tìm được Id"))
            }
            resolve(results)
        })
    })
}

savingWalletService.TransactionByCategory = (cat_type, w_id) => {
    const sql = `CALL procSavingTransByCat(${cat_type}, ${w_id})`;
    return new Promise ((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                reject(new Error("Something went wrong"))
            }
            if (Object.keys(results).length === 0){
                reject(new Error("Không tìm được id"))
            }
            resolve(results)
        })
    })
}


module.exports = savingWalletService;