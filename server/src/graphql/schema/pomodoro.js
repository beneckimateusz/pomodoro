const { gql } = require('apollo-server');

const pomodoroSchema = gql`
  extend type Query {
    allPomodoros: [Pomodoro!]!
  }

  extend type Mutation {
    createPomodoro(endDate: DateTime!, duration: Int!): Pomodoro!
  }

  type Pomodoro {
    id: ID!
    user: User!
    endDate: DateTime!
    duration: Int!
  }
`;

module.exports = pomodoroSchema;
