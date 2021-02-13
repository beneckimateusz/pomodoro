const { gql } = require('apollo-server');

const reportSchema = gql`
  extend type Query {
    periodReport(startDate: DateTime!, endDate: DateTime!): Report!
  }

  type DaySummary {
    date: String!
    pomodoroCount: Int!
    duration: Int!
  }

  type Report {
    totalDuration: Int!
    totalPomodoroCount: Int!
    daySummaries: [DaySummary!]!
  }
`;

module.exports = reportSchema;
