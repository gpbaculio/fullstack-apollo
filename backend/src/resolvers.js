export default {
  Query: {
    viewer: async (_, args, { user }) => user
  },
  Mutation: {
    signUp: async (_, args, { dataSources }) => {
      const response = await dataSources.api.signUp({ email: args.email, password: args.password });
      return { error: response.error, email: response.email }
    },
  },
};
