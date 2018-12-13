export default {
  Query: {
    viewer: async (_, args, { user }) => user
  },
  Mutation: {
    signUp: async (_, args, { dataSources }) => {
      const error = await dataSources.api.signUp({ email: args.email, password: args.password });
      return error
    },
  },
};
