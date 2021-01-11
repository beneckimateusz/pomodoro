const path = require('path');
const express = require('express');
const cors = require('cors');
require('./db/connection');

const app = express();
const buildPath = path.join(__dirname, '../build');

app.use(cors());
app.use(express.static('build'));

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

module.exports = app;
