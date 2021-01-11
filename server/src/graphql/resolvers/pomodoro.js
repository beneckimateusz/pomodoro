const { AuthenticationError, UserInputError } = require('apollo-server');
const { getMongooseValidationErrorMessages } = require('../../utils/errors');

const pomodoroResolvers = {
  Query: {
    allPomodoros: (parent, args, { models, me }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      // there is no resolver for 'user' field on type Pomodoro,
      // hence the populate
      // (not needed and n+1 problem)
      return models.Pomodoro.find({}).populate('user');
    },
  },
  Mutation: {
    createPomodoro: async (parent, { endDate, duration }, { models, me }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      const pomodoro = new models.Pomodoro({
        endDate,
        duration,
        user: me.id,
      });
      try {
        const savedPomodoro = pomodoro.save();
        return savedPomodoro;
      } catch (err) {
        const messages = getMongooseValidationErrorMessages(err);
        throw new UserInputError(messages[0]);
      }
    },
  },
};

module.exports = pomodoroResolvers;
