const { gql } = require('apollo-server');

const userSchema = gql`
  extend type Query {
    me: User

    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!

    updateUserSettings(settings: UserSettingsInput!): UserSettings!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    settings: UserSettings!
  }

  type UserSettings {
    timers: UserTimers!
    desktopAlerts: Boolean!
    darkTheme: Boolean!
  }

  input UserSettingsInput {
    timers: UserTimersInput!
    desktopAlerts: Boolean!
    darkTheme: Boolean!
  }

  type UserTimers {
    pomodoro: Int!
    shortBreak: Int!
    longBreak: Int!
  }

  input UserTimersInput {
    pomodoro: Int!
    shortBreak: Int!
    longBreak: Int!
  }

  type Token {
    token: String!
  }
`;

module.exports = userSchema;
