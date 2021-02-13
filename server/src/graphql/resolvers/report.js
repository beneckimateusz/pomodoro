const { AuthenticationError } = require('apollo-server');

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
          $addFields: {
            date: '$_id',
          },
        },
        {
          $project: { _id: 0 },
        },
        {
          $sort: { date: 1 },
        },
      ]);

      const report = {
        totalDuration: daySummaries.reduce((acc, ds) => acc + ds.duration, 0),
        totalPomodoroCount: daySummaries.length,
        daySummaries,
      };

      return report;
    },
  },
};

module.exports = reportResolvers;
