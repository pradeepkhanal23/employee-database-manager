const department = require("express").Router();

department.get("/", async (req, res) => {
  console.info(`${req.method} request received`);

  res.send("hey its working now");
});

module.exports = department;
