const express = require('express');
const cors = require('cors');
require('./db/connection');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('🚀').end();
});

module.exports = app;
