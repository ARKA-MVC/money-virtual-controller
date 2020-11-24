const registerService = require("../../service/auth/register.js");
const registerController = {};

registerController.createNewUser = (req, res) => {
  registerService
    .createNewUser(req.body)
    .then((results) => {
      console.log(results);
      return registerService.findUser("namp");
    })
    .then((results) => {
      console.log(results)
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
