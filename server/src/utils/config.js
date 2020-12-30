require('dotenv').config();

const { PORT, MONGODB_URI, JWT_SECRET } = process.env;

module.exports = { PORT, MONGODB_URI, JWT_SECRET };
