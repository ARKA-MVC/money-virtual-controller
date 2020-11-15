const registerService = require('../../service/auth/register.js');
const registerController = {};

registerController.createNewUser = (req, res) => {
  registerService.createNewUser(req.body, (err, results) => {
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

module.exports = registerController;
