const pool = require("../../config/db.config.js");
const walletsService = {};

walletsService.getAllTransByTimeRange = (userId, from, to) => {
  const sql = `CALL procAllWalletsTransByTimeRange(${userId}, '${from}', '${to}')`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      console.log(err)
      if (err) {
        reject(new Error("Cannot get all trans in time range"));
      }
      resolve(results);
    });
  });
};

walletsService.getSumAllTransByTimeRange = (userId, from, to) => {
  const sql = `CALL procTransAllSumByCategory(${userId}, '${from}', '${to}')`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      console.log(err)
      if (err) {
        reject(new Error("Cannot get sum all trans in time range"));
      }
      resolve(results);
    });
  });
}

module.exports = walletsService;
