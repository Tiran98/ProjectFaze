var mysql = require('mysql');
const { PASSWORD } = require('../config/db.config.js');
var dbConfig = require("../config/db.config.js")

const connection = mysql.createConnection({
  host : dbConfig.HOST,
  user : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB
})

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
})

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

module.exports = connection;

connection.end()