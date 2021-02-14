const { AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');

const reportResolvers = {
  Query: {
    periodReport: async (parent, { startDate, endDate }, { me, models }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      const daySummaries = await models.Pomodoro.aggregate([
        {
          $match: {
            endDate: {
              $gte: startDate,
              $lt: endDate,
            },
            user: mongoose.Types.ObjectId(me.id),
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$endDate' } },
            pomodoroCount: { $sum: 1 },
            duration: { $sum: '$duration' },
          },
        },
        {
          $project: { _id: 0, date: '$_id', pomodoroCount: 1, duration: 1 },
        },
        {
          $sort: { date: 1 },
        },
      ]);

      const report = {
        totalDuration: daySummaries.reduce((acc, ds) => acc + ds.duration, 0),
        totalPomodoroCount: daySummaries.reduce(
          (acc, ds) => acc + ds.pomodoroCount,
          0
        ),
        daySummaries,
      };

      return report;
    },

    yearReport: async (parent, { year }, { models, me }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      const monthSummaries = await models.Pomodoro.aggregate([
        {
          $project: {
            _id: 1,
            duration: 1,
            user: 1,
            year: { $year: '$endDate' },
            month: { $month: '$endDate' },
          },
        },
        {
          $match: {
            user: mongoose.Types.ObjectId(me.id),
            year,
          },
        },
        {
          $group: {
            _id: '$month',
            pomodoroCount: { $sum: 1 },
            duration: { $sum: '$duration' },
          },
        },
        {
          $project: { _id: 0, month: '$_id', pomodoroCount: 1, duration: 1 },
        },
        {
          $sort: { month: 1 },
        },
      ]);

      const report = {
        totalDuration: monthSummaries.reduce((acc, ds) => acc + ds.duration, 0),
        totalPomodoroCount: monthSummaries.reduce(
          (acc, ds) => acc + ds.pomodoroCount,
          0
        ),
        monthSummaries,
      };

      return report;
    },
  },
};

module.exports = reportResolvers;
