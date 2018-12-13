// require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { getUser } from './modules/auth'
import Api from './datasources/api'
import app from './modules'
import typeDefs from './schema'
import resolvers from './resolvers'

const port = process.env.PORT || 8000;

// set up any dataSources our resolvers need
const dataSources = () => ({
  api: new Api(),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const { user } = await getUser(req.headers.authorization);
  return { user };
};

const engine = {
  apiKey: process.env.ENGINE_API_KEY,
}

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  engine,
});

server.applyMiddleware({ app });

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  });
}
// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  Api,
  server,
};
