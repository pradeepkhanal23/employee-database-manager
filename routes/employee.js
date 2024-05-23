const employee = require("express").Router();

employee.get("/", (req, res) => {
  console.info(`${req.method} request received`);

  res.send("fetch the query here");
});

module.exports = employee;
