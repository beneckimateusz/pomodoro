const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const app = require('./app');
const config = require('./utils/config');
const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');
const models = require('./graphql/models');
const { getUserFromToken } = require('./utils/auth');

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

server.applyMiddleware({ app, path: '/api' });

const httpServer = http.createServer(app);

httpServer.listen({ port: config.PORT }, () =>
  // eslint-disable-next-line no-console
  console.log(`Server running at port ${config.PORT}`)
);
