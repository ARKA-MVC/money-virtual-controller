const pool = require('../../config/db.config.js');
const registerService = {};

registerService.createNewUser = (name, age, email) => {
  const sql = `CALL procUserInsert(${name}, ${age}, ${email})`;
  pool.query(sql, (err, results, fields) => {
    if (err) throw err;
    console.log(results);
    console.log(fields);
  })
}

module.exports = registerService;
