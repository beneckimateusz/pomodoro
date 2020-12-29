const { gql } = require('apollo-server');

const userSchema = gql`
  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(username: String!, password: String!): User
  }

  type User {
    id: ID!
    username: String!
  }
`;

module.exports = userSchema;
