const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: true,
  },
  settings: {
    timers: {
      pomodoro: {
        type: Number,
        min: [1, "Pomodoro can't be shorter than 1 minute"],
        default: 25,
      },
      shortBreak: {
        type: Number,
        min: [1, "Short break can't be shorter than 1 minute"],
        default: 5,
      },
      longBreak: {
        type: Number,
        min: [1, "Long break can't be shorter than 1 minute"],
        default: 15,
      },
    },
    desktopAlerts: {
      type: Boolean,
      default: false,
    },
    darkTheme: {
      type: Boolean,
      default: false,
    },
  },
});

userSchema.plugin(mongooseUniqueValidator);

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();

  this.password = await this.generatePasswordHash();
  return next();
});

userSchema.methods.validatePassword = async function validatePassword(
  password
) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generatePasswordHash = async function generatePasswordHash() {
  const saltRounds = 10;
  return bcrypt.hash(this.password, saltRounds);
};

const User = mongoose.model('User', userSchema);

User.findByLogin = async (login) => {
  let user = await User.findOne({ username: login });

  if (!user) {
    user = await User.findOne({ email: login });
  }

  return user;
};

module.exports = User;
