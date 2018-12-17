export default {
  Query: {
    viewer: async (_root, { page, sort, limit, search }, { user, dataSources: { api } }) => {
      if (!user) return null
      const query = {
        limit: 9,
        offset: (page - 1) * 9,
        search
      }
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
      const { todos, count } = await api.fetchTodos({ user, query });
      return ({ id: user.id, email: user.email, confirmed: user.confirmed, todos, todosCount: count })
    },
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
