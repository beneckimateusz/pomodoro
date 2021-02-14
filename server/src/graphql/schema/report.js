const { gql } = require('apollo-server');

const reportSchema = gql`
  extend type Query {
    periodReport(startDate: DateTime!, endDate: DateTime!): PeriodReport!

    yearReport(year: Int!): YearReport!
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
`;

module.exports = reportSchema;
