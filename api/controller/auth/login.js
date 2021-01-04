const loginService = require("../../service/auth/login");
const loginController = {};

loginController.login = (req, res) => {
  loginService
    .authUserWithPassword(req.body)
    .then((results) => {
      const user = results[0][0];
      req.session.currentUser = {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
      };
      res.status(200).json({
        results: user,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        message: err.message,
      });
    });
};

loginController.isLogin = (req, res) => {
  console.log(req.session.currentUser);
  if (req.session.currentUser !== undefined) {
    loginService
      .isUserLogin(req.session.currentUser)
      .then((results) => {
        res.status(200).json({
          results: results[0][0],
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: err.message,
        });
      });
  }
  res.status(200).json({
    results: undefined,
  });
};

module.exports = loginController;
