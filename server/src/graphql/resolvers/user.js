const { ValidationError } = require('apollo-server');
const bcrypt = require('bcrypt');

const userResolvers = {
  Query: {
    users: (parent, args, { models }) => models.User.find({}),
    user: (parent, { id }, { models }) => models.User.findById(id),
  },
  Mutation: {
    createUser: async (parent, { username, password }, { models }) => {
      const passwordHash = await bcrypt.hash(password, 10);

      try {
        const user = new models.User({ username, passwordHash });
        const savedUser = await user.save();
        return savedUser;
      } catch (err) {
        throw new ValidationError(err.message);
      }
    },
  },
};

module.exports = userResolvers;
