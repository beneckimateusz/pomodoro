const { ApolloServer } = require('apollo-server-express');
const app = require('./app');
const config = require('./utils/config');
const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');
const models = require('./graphql/models');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
  },
});

server.applyMiddleware({ app });

app.listen(config.PORT, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
