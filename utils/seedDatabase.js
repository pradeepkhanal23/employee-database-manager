const fs = require("fs");
const path = require("path");
const { pool } = require("../config/connection");

const seedDatabase = async () => {
  const client = await pool.connect();

  try {
    //constructing the schema and sql file paths
    const schemePath = path.join(__dirname, "../db/schema.sql");
    const seedsPath = path.join(__dirname, "../db/seeds.sqlseeds.sql");

    //reading the schema and seed sql files
    const schemaSQL = fs.readFileSync(schemePath, "utf-8");
    const seedsSQL = fs.readFileSync(seedsPath, "utf-8");

    // Drop the database if it exists
    await client.query("DROP DATABASE IF EXISTS company_db;");
    // Create the database
    await client.query("CREATE DATABASE company_db;");

    await client.query(schemaSQL);

    // we wrap seeding in as a transaction using pg-transactions doc's help https://node-postgres.com/features/transactions
    await client.query(seedsSQL);

    console.log("Database seeded successfully");
  } catch (error) {
    console.log("Error seeding the database:", error);
  } finally {
    client.release();
  }
};

module.exports = seedDatabase;
