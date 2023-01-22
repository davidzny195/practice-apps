const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env varibles in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: '/tmp/mysql.sock'
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, session_id VARCHAR(40), username VARCHAR(40) NOT NULL, email VARCHAR(40) NOT NULL, password VARCHAR(64) NOT NULL)"
    )

  ).then(() =>
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS user_info (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, address_line1 VARCHAR(255), address_line2 VARCHAR(255), city VARCHAR(255), state VARCHAR(255), zip VARCHAR(20), phone_number VARCHAR(20), credit VARCHAR(20), expiry VARCHAR(20), CVV VARCHAR(20), billing_zip VARCHAR(20), FOREIGN KEY (user_id) REFERENCES users(id))"
    )
  ).then(() => {
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS sessions (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, session_id VARCHAR(40), user_id INT, submitted BOOLEAN DEFAULT false, page VARCHAR(40), FOREIGN KEY (user_id) REFERENCES users(id))"
    )
  })
  .catch((err) => console.log(err));

module.exports = db;
