const registerService = require("../../service/auth/register.js");
const registerController = {};

registerController.createNewUser = (req, res) => {
  registerService
    .findExistedUsername(req.body.username)
    .then(results => {
      return registerService.findExistedEmail(req.body.email)
    })
    .then(results => {
      return registerService.createNewUser(req.body)
    })
    .then((results) => {
      return registerService.findUserByEmail(req.body.email);
    })
    .then((results) => {
      const user = results[0][0];
      req.session.currentUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password
      };
      console.log(req.session.currentUser)
      res.status(200).json({
        results: results[0][0],
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
      });
    });
};

module.exports = registerController;
