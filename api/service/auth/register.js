const pool = require('../../config/db.config.js');
const registerService = {};

registerService.createNewUser = (user, callback) => {
  const sql = `CALL procUserInsert("${user.name}", ${user.age}, "${user.email}")`;
  pool.query(sql, (err, results) => {
    if (!err) {
      return callback(null, results);
    } else {
      return callback(err);
    }
  })
}

module.exports = registerService;
