const { Pool } = require("pg");

async function runQuery(query, values = "", database = "project_db") {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: database,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
  });

  const client = await pool.connect();

  try {
    const response = await client.query(query, values);

    if (values === "") {
      console.table(response.rows);
    }
    client.release();
  } catch (error) {
    console.log("Error running the query", error);
  } finally {
    await pool.end();
  }
}

module.exports = runQuery;
