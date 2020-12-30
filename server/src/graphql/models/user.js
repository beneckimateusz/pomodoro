const User = require('../../db/models/user');

User.findByLogin = async (login) => {
  let user = await User.findOne({ username: login });

  if (!user) {
    user = await User.findOne({ email: login });
  }

  return user;
};

module.exports = User;
