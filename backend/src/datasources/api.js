import { RESTDataSource } from 'apollo-datasource-rest';
import map from 'lodash/map'

class Api extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.HOSTNAME || process.env.LOCALHOST}api`;
  }

  async logIn({ email, password }) {
    const { token, error } = await this.post('/auth', { email, password });
    return ({
      token,
      error
    });
  }

  async signUp({ email, password }) {
    const response = await this.post('/user', { email, password })
    return ({
      error: response.error,
      email: response.email
    })
  }

  async addTodo({ text, userId }) {
    const { todo } = await this.post('/todo', { text, userId })
    return ({
      todo
    })
  }

  async fetchTodos({ user: { id }, query: { offset, limit, complete } }) {
    const { todos, count } = await this.get('/todo/fetchTodos', { id, offset, limit, complete })
    return ({
      count,
      todos
    })
  }

  async updateTodoText({ input, userId }) {
    const { todo } = await this.post('/todo/updateText', { input, userId })
    return ({
      todo
    })
  }

  async deleteTodo({ input, user }) {
    const { _id } = await this.post('/todo/deleteTodo', { input, user })
    return ({
      _id
    })
  }

  async toggleComplete({ input, user }) {
    const { _ids } = await this.post('/todo/toggleComplete', { input, user })
    return ({
      _ids: map(_ids, ({ _id }) => _id)
    })
  }

  async clearCompleted({ input, user }) {
    const { _ids } = await this.post('/todo/clearCompleted', { input, user })
    return ({
      _ids
    })
  }

}

export default Api
