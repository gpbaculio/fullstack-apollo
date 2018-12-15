export default {
  Query: {
    viewer: async (_root, _args, { user }) => user
  },
  Mutation: {
    signUp: async (_root, { email, password }, { dataSources }) => {
      const response = await dataSources.api.signUp({ email, password });
      return {
        error: response.error,
        email: response.email
      }
    },
    logIn: async (_, { email, password }, { dataSources }) => {
      const response = await dataSources.api.logIn({ email, password });
      return {
        error: response.error,
        user: response.user
      }
    }
  },
};
