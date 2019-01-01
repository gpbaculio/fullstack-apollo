// require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http'
import { getUser } from './modules/auth'
import Api from './datasources/api'
import app from './modules'
import typeDefs from './schema'
import resolvers from './resolvers'

const PORT = process.env.PORT || 8000;

// set up any dataSources our resolvers need
const dataSources = () => ({
  api: new Api(),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req, connection }) => {
  if (connection) {
    // check connection for metadata
    return connection.context;
  }
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
  subscriptions: {
    onConnect: async ({ token }) => {
      if (token) {
        const { user } = await getUser(token);
        console.log('subscriptions user = ', user)
        return { user }
      }

      throw new Error('Missing auth token!');
    },
    onDisconnect: (webSocket, con) => {
      // ...
      console.log('webSocket = ', webSocket)
      console.log('con = ', con)
    },
  },
});

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 http Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 http Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
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
