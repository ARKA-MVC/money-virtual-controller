
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
    console.log(note)
    console.log(note)
    console.log(note)
    console.log(note)
    console.log(note)
    console.log(note)

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
                reject(new Error("Something went wrong"))
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
                reject(new Error("Eo tim duoc thang nao het"))
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
                reject(new Error("Lỗi"))
            }
            if (Object.keys(results).length === 0){
                reject(new Error("Không tìm được Id"))
            }
            resolve(results)
        })
    })
}


module.exports = savingWalletService;