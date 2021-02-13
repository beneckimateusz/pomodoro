const scalarResolvers = require('../scalars');
const userResolvers = require('./user');
const pomodoroResolvers = require('./pomodoro');
const summaryResolvers = require('./summary');

module.exports = [
  scalarResolvers,
  userResolvers,
  pomodoroResolvers,
  summaryResolvers,
];
