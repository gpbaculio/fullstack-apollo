
export default {
  Query: {
    viewer: async (_root, { page = 1, sort, limit, search }, { user, dataSources: { api } }) => {
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
      // const five = Buffer.from((5).toString()).toString('base64')
      // console.log(five)
      // const decoded = Buffer.from(`${five}`, 'base64').toString('ascii')
      // console.log(decoded)
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
      const { todo } = await api.addTodo({ text, userId })
      return ({
        todo
      })
    },
    updateTodoText: async (_root, { input }, { dataSources: { api }, user: { id: userId } }) => {
      const { todo } = await api.updateTodoText({ input, userId })
      return ({
        todo
      })
    },
    deleteTodo: async (_root, { input }, { dataSources: { api }, user }) => {
      const { _id } = await api.deleteTodo({ input, user })
      return ({ _id })
    },
    toggleComplete: async (_root, { input }, { dataSources: { api }, user }) => {
      const { _ids } = await api.toggleComplete({ input, user })
      return ({
        toggledIds: _ids
      })
    },
    clearCompleted: async (_root, { input }, { dataSources: { api }, user }) => {
      console.log('input = ', input)
      const { _ids } = await api.clearCompleted({ input, user })
      return ({
        clearedIds: _ids
      })
    }
  },
};
