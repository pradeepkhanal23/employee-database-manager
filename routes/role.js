const role = require("express").Router();

role.get("/", (req, res) => {
  console.info(`${req.method} request received`);

  res.send("Hey myan whats up");
});

module.exports = role;
