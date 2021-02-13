const { gql } = require('apollo-server');

const userSchema = require('./user');
const pomodoroSchema = require('./pomodoro');
const summarySchema = require('./summary');

const linkSchema = gql`
  scalar DateTime

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, pomodoroSchema, summarySchema];
