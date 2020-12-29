const mongoose = require('mongoose');
const config = require('../utils/config');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to mongodb'))
  .catch((err) => console.log('connection to mongodb failed', err.message));
