const scalarResolvers = require('../scalars');
const userResolvers = require('./user');
const pomodoroResolvers = require('./pomodoro');
const reportResolvers = require('./report');

module.exports = [
  scalarResolvers,
  userResolvers,
  pomodoroResolvers,
  reportResolvers,
];
