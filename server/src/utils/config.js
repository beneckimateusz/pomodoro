require('dotenv').config();

const { NODE_ENV, PORT, JWT_SECRET } = process.env;

const MONGODB_URI =
  NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

module.exports = { PORT, MONGODB_URI, JWT_SECRET };
