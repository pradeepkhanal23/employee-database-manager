//importing necessary module
const express = require("express");
//initializing app using express function
const app = express();

const seedDatabase = require("./config/connection.js");
const cli = require("./utils/inquirer.js");
const showFiglet = require("./utils/figlet.js");

// setting the port number for the server to listen on
const PORT = 3000;

// connecting to the database and seeding it with dummy values to begin with
//also trigerring the cli after the seeding is done to prevent the event loop getting blocked and running synchronously
seedDatabase().then(() => {
  showFiglet();
  cli();
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
