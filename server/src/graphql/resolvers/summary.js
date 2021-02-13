const { AuthenticationError } = require('apollo-server');
const { getDateOnlyString } = require('../../utils/utils');

const summaryResolvers = {
  Query: {
    periodSummary: async (parent, { startDate, endDate }, { me, models }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      const pomodoros = await models.Pomodoro.find({
        endDate: {
          $gte: getDateOnlyString(startDate),
          $lt: getDateOnlyString(endDate),
        },
        user: me.id,
      }).sort({ endDate: 1 });

      return {
        startDate,
        endDate,
        pomodoros,
      };
    },
  },
};

module.exports = summaryResolvers;
