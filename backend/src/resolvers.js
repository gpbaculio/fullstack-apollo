export default {
  Query: {
    viewer: async (_root, _args, { user }) => user,
    fetchTodos: async (_root, { page, sort, limit }, { user: { id: userId }, dataSources: { api } }) => {
      const offset = (page - 1) * 9
      const query = { page, limit: 9, offset }
      if (limit) {
        query.limit = limit
      }
      if (sort === 'all') {
        query.complete = null
      } else if (sort === 'active') {
        query.complete = false
      } else {
        query.complete = true
      }
      const response = await api.fetchTodos({ userId, query });
      return response
    }
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
