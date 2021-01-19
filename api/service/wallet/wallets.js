const pool = require("../../config/db.config.js");
const walletsService = {};

walletsService.getAllTransByTimeRange = (userId) => {
  const sql = `CALL procAllWalletsTransByTimeRange(${userId})`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot get all trans in time range"));
      }
      resolve(results);
    });
  });
};

module.exports = walletsService;
