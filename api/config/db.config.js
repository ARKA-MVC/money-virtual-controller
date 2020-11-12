const mysql = require("mysql");

// Change this to your local config
const dbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DBNAME: "mvc_db"
};

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DBNAME
});

module.exports = pool;
