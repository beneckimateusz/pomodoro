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
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
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

module.exports = User;
