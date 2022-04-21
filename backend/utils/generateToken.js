const JWT = require("jsonwebtoken");

const generateToken = (id, name) => {
  return JWT.sign({ id, name }, process.env.JWT_SECRET);
};

module.exports = generateToken;
