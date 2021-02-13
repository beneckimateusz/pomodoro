const { AuthenticationError } = require('apollo-server');

const summaryResolvers = {
  Query: {
    periodSummary: async (parent, { startDate, endDate }, { me, models }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      // const pomodoros = await models.Pomodoro.find({
      //   endDate: {
      //     $gte: getDateOnlyString(startDate),
      //     $lt: getDateOnlyString(endDate),
      //   },
      //   user: me.id,
      // }).sort({ endDate: 1 });

      const summaries = await models.Pomodoro.aggregate([
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
            pomodoros: { $push: '$$ROOT' },
          },
        },
        {
          $addFields: {
            date: '$_id',
            totalDuration: { $sum: '$pomodoros.duration' },
          },
        },
        {
          $project: { _id: 0 },
        },
        {
          $sort: { date: 1 },
        },
      ]);

      return summaries;
    },
  },
};

module.exports = summaryResolvers;
