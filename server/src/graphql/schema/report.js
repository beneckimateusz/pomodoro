const { gql } = require('apollo-server');

const reportSchema = gql`
  extend type Query {
    periodReport(startDate: DateTime!, endDate: DateTime!): PeriodReport!
    yearReport(year: Int!): YearReport!
    dayReport(date: DateTime!): DayReport!
  }

  type DaySummary {
    date: String!
    pomodoroCount: Int!
    duration: Int!
  }

  type PeriodReport {
    totalDuration: Int!
    totalPomodoroCount: Int!
    daySummaries: [DaySummary!]!
  }

  type MonthSummary {
    month: Int!
    pomodoroCount: Int!
    duration: Int!
  }

  type YearReport {
    totalDuration: Int!
    totalPomodoroCount: Int!
    monthSummaries: [MonthSummary!]!
  }

  type DayReport {
    totalDuration: Int!
    totalPomodoroCount: Int!
    pomodoros: [Pomodoro!]!
  }
`;

module.exports = reportSchema;
