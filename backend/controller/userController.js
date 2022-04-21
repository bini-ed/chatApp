const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const { User, validateUser, validateAuth } = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const { error } = validateUser({ name, email, password });
  if (error) return res.status(400).send(error.details[0].message);

  const checkUser = await User.findOne({ email });
  if (checkUser) return res.status(400).send("User Already Exists");

  const user = new User({
    name,
    email,
    password,
    pic,
  });
  const salt = await bcrypt.genSalt(15);
  user.password = await bcrypt.hash(user.password, salt);
  const userCheck = await user.save();
  if (!userCheck) {
    return res.status(400).send("User registration failed");
  } else {
    const token = generateToken(user._id, user.name);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(user);
  }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { error } = validateAuth({ email, password });
  if (error) return res.status(400).send(error.details[0].message);
  else {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).send("Invalid Email or Password");
      const token = generateToken(user._id, user.name);

      if (token) return res.status(200).send(token);
      else {
        return res.send("No Token Found");
      }
    }
  }
});

const allUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});
module.exports = { registerUser, login, allUser };
