const pool = require("../../config/db.config.js");
const categoryService = {};

categoryService.getAllCategories = () => {
  const sql = `SELECT * FROM vwCategoryAll`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot get all categories"));
      }
      resolve(results);
    });
  });
}

categoryService.getSavingCategories = () => {
  const sql = `SELECT * FROM vwCategoryAll WHERE id = 10 OR id = 28`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        reject(new Error("Cannot get all categories"));
      }
      resolve(results);
    });
  });
}

module.exports = categoryService;
