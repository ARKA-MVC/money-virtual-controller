const pool = require("../../config/db.config.js");
const registerService = {};

registerService.createNewUser = (user) => {
  const sql =
    "SET @message ='';" +
    `CALL procUserCreate("${user.username}", "${user.email}", ${user.gender}, "${user.password}", @message);` +
    "SELECT @message;";
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(new Error("Loi roi!!! Del tao duoc user dau"));
      }
      resolve(results);
    });
  });
};

registerService.findExistedEmail = (email) => {
  const sql = `CALL procUserFindByEmail("${email}")`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (results[0].length !== 0 || err) {
        reject(new Error("Email Used"));
      }
      resolve("Continue");
    });
  });
};

registerService.findExistedUsername = (username) => {
  const sql = `CALL procUserFindExistedUsername("${username}")`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      console.log(results);
      if (results[0].length !== 0 || err) {
        reject(new Error("Username Used"));
      }
      resolve("Continue");
    });
  });
};
//This is just a test function for chaining promise
registerService.findUserByEmail = (email) => {
  const sql = `CALL procUserFindByEmail("${email}")`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(new Error("Eo tim duoc thang nao het"));
      }
      resolve(results);
    });
  });
};

module.exports = registerService;
