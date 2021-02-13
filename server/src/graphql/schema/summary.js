const { gql } = require('apollo-server');

const summarySchema = gql`
  extend type Query {
    periodSummary(startDate: DateTime!, endDate: DateTime!): Summary!
  }

  type Summary {
    startDate: DateTime!
    endDate: DateTime!
    pomodoros: [Pomodoro!]!
  }
`;

module.exports = summarySchema;
