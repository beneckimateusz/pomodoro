const { gql } = require('apollo-server');

const summarySchema = gql`
  extend type Query {
    periodSummary(startDate: DateTime!, endDate: DateTime!): [Summary!]!
  }

  type Summary {
    date: String!
    totalDuration: Int!
    pomodoros: [Pomodoro!]!
  }
`;

module.exports = summarySchema;
