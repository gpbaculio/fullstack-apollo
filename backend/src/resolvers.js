
import { withFilter } from 'apollo-server'
import pubsub from './pubSub'

const TODO_ADDED = 'TODO_ADDED'

export default {
  Query: {
    viewer: async (_root, { page = 1, sort, search }, { user, dataSources: { api } }) => {
      if (!user) return null
      const query = {
        search,
        limit: 9,
        offset: (page - 1) * 9
      }
      if (sort === 'complete') {
        query.complete = true
      } else if (sort === 'active') {
        query.complete = false
      } else {
        query.complete = undefined
      }
      // const five = Buffer.from((5).toString()).toString('base64')
      // console.log(five)
      // const decoded = Buffer.from(`${five}`, 'base64').toString('ascii')
      // console.log(decoded)
      const { todos, count } = await api.fetchTodos({ user, query });
      return ({ id: user.id, email: user.email, confirmed: user.confirmed, todos: [...todos], todosCount: count })
    },
  },
  Subscription: {
    todoAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(TODO_ADDED),
        (payload, _variables, context) => {
          console.log('payload = ', payload)
          console.log('context = ', context)
          console.log('truth = ', (payload.todoAdded.userId === context.user.id))
          return (payload.todoAdded.userId === context.user.id)
        },
      ),
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
      const { error, token } = await api.logIn({ email, password });
      return ({
        error,
        token
      })
    },
    addTodo: async (_root, { text }, { dataSources: { api }, user: { id: userId } }) => {
      const { todo } = await api.addTodo({ text, userId })
      pubsub.publish(TODO_ADDED, { todoAdded: { ...todo, userId: todo.userId._id } });
      return ({
        todo: {
          ...todo,
          userId: todo.userId._id
        }
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
      const { _ids } = await api.clearCompleted({ input, user })
      return ({
        clearedIds: _ids
      })
    }
  },
};
