const express = require("express");
const dotenv = require("dotenv");
const conectDB = require("./config/db");

const app = express();
dotenv.config();
conectDB();

app.get("/api/chat", (req, res) => {
  res.send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on ${PORT}`));
