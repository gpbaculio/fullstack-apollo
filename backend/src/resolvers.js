export default {
  Query: {
    viewer: async (_root, _args, { user }) => user
  },
  Mutation: {
    signUp: async (_root, { email, password }, { dataSources: { api } }) => {
      const response = await api.signUp({ email, password });
      return ({
        error: response.error,
        email: response.email
      })
    },
    logIn: async (_root, { email, password }, { dataSources: { api } }) => {
      const { error, user } = await api.logIn({ email, password });
      return ({
        error,
        user
      })
    },
    addTodo: async (_root, { text }, { dataSources: { api }, user: { id: userId } }) => {
      const todo = await api.addTodo({ text, userId })
      return ({
        todo
      })
    }
  },
};
