const { AuthenticationError, UserInputError } = require('apollo-server');
const { getMongooseValidationErrorMessages } = require('../../utils/errors');
const { createToken } = require('../../utils/auth');

const userResolvers = {
  Query: {
    me: (parent, args, { models, me }) => {
      if (!me) return null;
      return models.User.findById(me.id);
    },
  },
  Mutation: {
    signUp: async (parent, { username, email, password }, { models }) => {
      const user = new models.User({ username, email, password });

      try {
        const savedUser = await user.save();
        return { token: createToken(savedUser) };
      } catch (err) {
        const messages = getMongooseValidationErrorMessages(err, 'User');
        throw new UserInputError(messages[0]);
      }
    },

    signIn: async (parent, { login, password }, { models }) => {
      const user = await models.User.findByLogin(login);

      const passwordMatches = user
        ? await user.validatePassword(password)
        : false;

      if (!passwordMatches) {
        throw new AuthenticationError('Invalid credentials');
      }

      return { token: createToken(user) };
    },

    updateUserSettings: async (parent, { settings }, { models, me }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      const user = await models.User.findById(me.id);
      try {
        user.settings = settings;
        const savedUser = await user.save();
        return savedUser.settings;
      } catch (err) {
        const messages = getMongooseValidationErrorMessages(err, 'User');
        throw new UserInputError(messages[0]);
      }
    },
  },
};

module.exports = userResolvers;
