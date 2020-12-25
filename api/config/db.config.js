const mysql = require("mysql");

// Change this to your local config
const dbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DBNAME: "MVC"
};

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DBNAME,
  multipleStatements: true
});

module.exports = pool;
