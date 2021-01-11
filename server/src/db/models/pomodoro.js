const mongoose = require('mongoose');
const validator = require('validator');

const pomodoroSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  endDate: {
    type: Date,
    required: true,
    validate: [validator.isDate, 'Invalid date'],
  },
  duration: {
    type: Number,
    required: true,
    min: [1, "Pomodoro duration can't be shorter than 1 minute"],
  },
});

const Pomodoro = mongoose.model('Pomodoro', pomodoroSchema);

module.exports = Pomodoro;
