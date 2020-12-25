const pool = require('../../config/db.config.js');
const registerService = {};

registerService.createNewUser = (user) => {
  console.log(user)
  const sql = "SET @message ='';" +
            `CALL ProInsertUser("${user.username}", "${user.email}", "${user.gender}", "${user.password}", @message);` +
            "SELECT @message;"
  console.log(sql)
  return new Promise ((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(new Error("Loi roi!!! Del tao duoc user dau"))
      } 
      resolve(results)
    })
  })
}

//This is just a test function for chaining promise 
registerService.findUserByEmail = (email) => {
  const sql = `SELECT * FROM User WHERE email = "${email}"`;
  return new Promise ((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(new Error("Eo tim duoc thang nao het"))
      } 
      resolve(results)
    })
  })
}

module.exports = registerService;
