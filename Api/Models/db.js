var mysql = require('mysql');
const { PASSWORD } = require('../config/db.config.js');
var dbConfig = require("../config/db.config.js")

const connection = mysql.createConnection({
  host : dbConfig.HOST,
  user : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB
})

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

module.exports = connection;