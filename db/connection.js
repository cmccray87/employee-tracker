const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Vegies19',
  database: 'employees'
});

module.exports = db;