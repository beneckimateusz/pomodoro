const jwt = require('jsonwebtoken');
const config = require('./config');

const createToken = ({ _id: id, username, email }) =>
  jwt.sign({ id, username, email }, config.JWT_SECRET);

const getUserFromToken = (token) => {
  if (!token.startsWith('Bearer ')) return null;

  return jwt.verify(token.substring(7), config.JWT_SECRET);
};

module.exports = { createToken, getUserFromToken };
