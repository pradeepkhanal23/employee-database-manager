//importing necessary module
const express = require("express");
//initializing app using express function
const app = express();
//modular api router
const apiRouter = require("./routes/index.js");
//importing connection file from config folder
const { connectDB } = require("./config/connection.js");

// setting the port number for the server to listen on
const PORT = 3000;

//connecting to the DB
connectDB();

//api will handle the api request
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
