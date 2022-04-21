const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");

const conectDB = require("./config/db");
const UserRoute = require("./routes/userRoutes");
const ChatRoute = require("./routes/chatRoutes");
const {
  notFound,
  errorHandle,
} = require("./middleware/errorHandlerMiddleware");

const app = express();
dotenv.config();
conectDB();
app.use(express.json());
app.use(cors());

app.get("/api/chat", (req, res) => {
  res.send();
});

app.use("/", UserRoute);
app.use("/", ChatRoute);
app.use(notFound);
app.use(errorHandle);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on ${PORT}`));
