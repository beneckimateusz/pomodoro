const { AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const { safeDivision } = require('../../utils/utils');

const reportResolvers = {
  Query: {
    periodReport: async (parent, { startDate, endDate }, { me, models }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      const daySummaries = await models.Pomodoro.aggregate([
        {
          $match: {
            endDate: {
              $gte: startDate,
              $lt: endDate,
            },
            user: mongoose.Types.ObjectId(me.id),
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$endDate' } },
            pomodoroCount: { $sum: 1 },
            duration: { $sum: '$duration' },
            avgDuration: { $avg: '$duration' },
          },
        },
        {
          $addFields: { date: '$_id' },
        },
        {
          $project: { _id: 0 },
        },
        {
          $sort: { date: 1 },
        },
      ]);

      const totalDuration = daySummaries.reduce(
        (acc, ds) => acc + ds.duration,
        0
      );

      const avgTotalDuration = safeDivision(totalDuration, daySummaries.length);

      const totalPomodoroCount = daySummaries.reduce(
        (acc, ds) => acc + ds.pomodoroCount,
        0
      );

      const avgTotalPomodoroCount = safeDivision(
        totalPomodoroCount,
        daySummaries.length
      );

      const report = {
        totalDuration,
        totalPomodoroCount,
        avgTotalDuration,
        avgTotalPomodoroCount,
        daySummaries,
      };

      return report;
    },

    yearReport: async (parent, { year }, { models, me }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      const monthSummaries = await models.Pomodoro.aggregate([
        {
          $project: {
            _id: 1,
            duration: 1,
            user: 1,
            year: { $year: '$endDate' },
            month: { $month: '$endDate' },
          },
        },
        {
          $match: {
            user: mongoose.Types.ObjectId(me.id),
            year,
          },
        },
        {
          $group: {
            _id: '$month',
            pomodoroCount: { $sum: 1 },
            duration: { $sum: '$duration' },
            avgDuration: { $avg: '$duration' },
          },
        },
        {
          $addFields: { month: '$_id' },
        },
        {
          $project: { _id: 0 },
        },
        {
          $sort: { month: 1 },
        },
      ]);

      const totalDuration = monthSummaries.reduce(
        (acc, ds) => acc + ds.duration,
        0
      );

      const avgTotalDuration = safeDivision(
        totalDuration,
        monthSummaries.length
      );

      const totalPomodoroCount = monthSummaries.reduce(
        (acc, ds) => acc + ds.pomodoroCount,
        0
      );

      const avgTotalPomodoroCount = safeDivision(
        totalPomodoroCount,
        monthSummaries.length
      );

      const report = {
        totalDuration,
        totalPomodoroCount,
        avgTotalDuration,
        avgTotalPomodoroCount,
        monthSummaries,
      };

      return report;
    },

    dayReport: async (parent, { date }, { models, me }) => {
      if (!me) throw new AuthenticationError('not authenticated');

      const nextDayStart = new Date(date);
      nextDayStart.setDate(nextDayStart.getDate() + 1);

      const pomodoros = await models.Pomodoro.find({
        user: me.id,
        endDate: {
          $gte: date,
          $lt: nextDayStart,
        },
      }).sort({ endDate: 'asc' });

      const totalDuration = pomodoros.reduce((acc, p) => acc + p.duration, 0);
      const avgDuration = safeDivision(totalDuration, pomodoros.length);
      const totalPomodoroCount = pomodoros.length;

      const report = {
        totalDuration,
        totalPomodoroCount,
        avgDuration,
        pomodoros,
      };

      return report;
    },
  },
};

module.exports = reportResolvers;
