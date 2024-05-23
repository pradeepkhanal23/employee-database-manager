const pg = require("pg");

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  port: 5432,
  database: "postgres",
});

const query = (text, params) => pool.query(text, params);

module.exports = query;
