const express = require('express');
const cors = require('cors');
require('./db/connection');

const app = express();

app.use(cors());
app.use(express.static('build'));

module.exports = app;
