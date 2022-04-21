const express = require("express");
const User = require("../controller/userController");
const protectURL = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/registerUser", User.registerUser);
route.post("/login", User.login);
route.get("/allUser", protectURL, User.allUser);

module.exports = route;
