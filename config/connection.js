const { Pool } = require("pg");
const fs = require("fs/promises");
const path = require("path");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

const seedDatabase = async () => {
  const client = await pool.connect();

  try {
    // Drop and recreate the database
    await client.query("DROP DATABASE IF EXISTS project_db;");
    await client.query("CREATE DATABASE project_db;");

    // Disconnect from the default database and connect to the new database
    client.release();
    const newPool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "project_db", // Connect to the new database
      password: "postgres",
      port: 5432,
    });

    const newClient = await newPool.connect();

    // Read and execute the schema SQL file
    const schemaPath = path.join(__dirname, "../db/schema.sql");
    const schemaSQL = await fs.readFile(schemaPath, "utf-8");

    await newClient.query(schemaSQL);

    // Read and execute the seeds SQL file
    const seedsPath = path.join(__dirname, "../db/seeds.sql");
    const seedsSQL = await fs.readFile(seedsPath, "utf-8");

    await newClient.query("BEGIN");
    await newClient.query(seedsSQL);
    await newClient.query("COMMIT");

    console.log("Database seeded successfully");

    newClient.release();
    await newPool.end();
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await pool.end();
  }
};

seedDatabase().catch((err) => console.error("Error during seeding:", err));
