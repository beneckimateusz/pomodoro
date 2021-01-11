const scalarResolvers = require('../scalars');
const userResolvers = require('./user');
const pomodoroResolvers = require('./pomodoro');

module.exports = [scalarResolvers, userResolvers, pomodoroResolvers];
