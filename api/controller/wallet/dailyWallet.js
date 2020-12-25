const registerService = require('../../service/wallet/dailyWallet.js');
const dailyWalletController = {};

dailyWalletController.createNewWallet = (req, res) => {
    const body = req.body;
    registerService.createNewWallet(body.name, body.balance, body.user_id, (err, results) => {
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

module.exports = dailyWalletController;