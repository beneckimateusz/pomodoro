const { ApolloServer } = require('apollo-server-express');
const app = require('./app');
const config = require('./utils/config');
const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');
const models = require('./graphql/models');
const { getUserFromToken } = require('./graphql/resolvers/user');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const me = getUserFromToken(token);

    return {
      me,
      models,
    };
  },
});

server.applyMiddleware({ app });

app.listen(config.PORT, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
