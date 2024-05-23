require("dotenv").config();

const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: process.env.DB_NAME,
});

async function connectDB() {
  try {
    const connection = await pool.connect();
    if (connection) {
      console.log("Postgres DB successfully connected...");
    }
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

module.exports = {
  connectDB,
  pool,
};
