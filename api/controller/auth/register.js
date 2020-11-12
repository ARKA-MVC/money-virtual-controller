const registerService = require('../../service/auth/register.js');
const registerController = {};

registerController.createNewUser = (req, res) => {
  console.log(req.body);
};

module.exports = registerController;
