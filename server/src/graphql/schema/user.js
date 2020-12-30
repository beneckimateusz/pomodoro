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
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Token {
    token: String!
  }
`;

module.exports = userSchema;
