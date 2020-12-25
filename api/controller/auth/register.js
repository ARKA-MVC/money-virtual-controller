const registerService = require("../../service/auth/register.js");
const registerController = {};

registerController.createNewUser = (req, res) => {
  registerService
    .createNewUser(req.body)
    .then((results) => {
      console.log(results);
      return registerService.findUserByEmail(req.body.email);
    })
    .then((results) => {
      console.log(results);
      user = results[0];
      req.session.currentUser = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      console.log(req.session.currentUser)
      res.status(200).json({
        results: results,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
};

module.exports = registerController;
