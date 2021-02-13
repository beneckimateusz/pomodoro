const { gql } = require('apollo-server');

const pomodoroSchema = gql`
  extend type Mutation {
    createPomodoro(endDate: DateTime!, duration: Int!): Pomodoro!
  }

  type Pomodoro {
    id: ID!
    user: ID!
    endDate: DateTime!
    duration: Int!
  }
`;

module.exports = pomodoroSchema;
