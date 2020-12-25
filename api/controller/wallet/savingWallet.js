const savingWalletService = require('../../service/wallet/savingWallet.js');
const savingWalletController = {};

savingWalletController.createNewWallet = (req, res) => {
    const body = req.body;
    savingWalletService.createNewWallet(body.name, body.end_date, body.starting_amount, body.goal_amount, body.user_id, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Cannot create user"
            })
        } else {
            res.status(200).json({
                message: "Created new user successfully!"
            })
        }
    });
};

savingWalletController.newTransaction = (req, res) => {
    const body = req.body;
    savingWalletService.newTransaction(body.note, body.amount, body.category_id, body.saving_id, body.trans_time, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Cannot create user"
            })
        } else {
            res.status(200).json({
                message: "Created new user successfully!"
            })
        }
    })
}

savingWalletController.statisticThisMonth = (req, res) => {
    savingWalletService
        .getWallet(req.params.wallet_id)
        .getCategory(req)
        .then((results) => {
            console.log(results)
            return savingWalletService.statisticThisMonth(results[0].id);
        })
        .then((results) =>{
            console.log(results)
            res.status(200).json({
                resutls:results,
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: err.message,
            })
        })
}

savingWalletController.getWallet = (req, res) =>{
    savingWalletService
        .getWallet(req.params.wallet_id)
        .then((results) => {
            console.log(typeof results)
            console.log("0")
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
}

savingWalletController


module.exports = savingWalletController;