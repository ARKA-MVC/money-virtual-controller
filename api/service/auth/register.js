const pool = require('../../config/db.config.js');
const registerService = {};

registerService.createNewUser = (user) => {
  const sql = `CALL procUserInsert("${user.name}", ${user.age}, "${user.email}")`;
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
registerService.findUser = (userName) => {
  const sql = `SELECT * FROM User WHERE Name = "${userName}"`;
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
