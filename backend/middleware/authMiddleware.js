const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const { User } = require("../models/userModel");

const protectURL = asyncHandler(async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).send("You need to login to access this page");
  }

  try {
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id).select("-password");
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
});

module.exports = protectURL;
