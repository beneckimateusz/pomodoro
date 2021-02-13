const { AuthenticationError, UserInputError } = require('apollo-server');
const { getMongooseValidationErrorMessages } = require('../../utils/errors');

const pomodoroResolvers = {
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
