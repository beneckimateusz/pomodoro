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
    avgDuration: Float!
  }

  type PeriodReport {
    totalDuration: Int!
    totalPomodoroCount: Int!
    avgTotalDuration: Float!
    avgTotalPomodoroCount: Float!
    daySummaries: [DaySummary!]!
  }

  type MonthSummary {
    month: Int!
    pomodoroCount: Int!
    duration: Int!
    avgDuration: Float!
  }

  type YearReport {
    totalDuration: Int!
    totalPomodoroCount: Int!
    avgTotalDuration: Float!
    avgTotalPomodoroCount: Float!
    monthSummaries: [MonthSummary!]!
  }

  type DayReport {
    totalDuration: Int!
    totalPomodoroCount: Int!
    avgDuration: Float!
    pomodoros: [Pomodoro!]!
  }
`;

module.exports = reportSchema;
