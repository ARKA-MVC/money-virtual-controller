const pool = require('../../config/db.config.js');
const loginService = {};

loginService.authUserWithPassword = (user) => {
  const sql = `CALL procUserPasswordFindWithUsername("${user.username}", "${user.password}")`
  return new Promise ((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err || results[0].length === 0) {
        reject(new Error("Auth Failed"))
      } 
      resolve(results)
    })
  })
}

loginService.isUserLogin = (user) => {
  const sql = `CALL procUserFindByUsernameAndMD5Pass("${user.username}", "${user.password}")`
  return new Promise ((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err || results[0].length === 0) {
        reject(new Error("Auth Failed"))
      } 
      resolve(results)
    })
  })
}

module.exports = loginService;