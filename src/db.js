const { createPool } = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, sslConfig } = require("./config.js");

const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
  timezone: 'local',
  ...sslConfig
});

module.exports = { pool }