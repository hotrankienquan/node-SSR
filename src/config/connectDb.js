// get the client
// import mysql from 'mysql2'
const mysql = require('mysql2/promise');
// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'hoidanit'
});

// simple query
// connection.query(
//   'SELECT * FROM `users`',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function (err, results) {
//     console.log(results);
//   }
// );
export default pool;