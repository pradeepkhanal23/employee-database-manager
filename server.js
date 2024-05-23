//importing necessary module
const express = require("express");

//initializing app using express function
const app = express();

// setting the port number for the server to listen on
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
