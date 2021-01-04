const { AuthenticationError, UserInputError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const { getMongooseValidationErrorMessages } = require('../../utils/errors');

const createToken = ({ _id: id, username, email }) =>
  jwt.sign({ id, username, email }, config.JWT_SECRET);

const getUserFromToken = (token) => {
  if (!token.startsWith('Bearer ')) return null;

  return jwt.verify(token.substring(7), config.JWT_SECRET);
};

const userResolvers = {
  Query: {
    me: (parent, args, { models, me }) => {
      if (!me) return null;
      return models.User.findById(me.id);
    },

    users: (parent, args, { models }) => models.User.find({}),
    user: (parent, { id }, { models }) => models.User.findById(id),
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

module.exports = { userResolvers, getUserFromToken };
