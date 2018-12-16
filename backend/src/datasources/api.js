import { RESTDataSource } from 'apollo-datasource-rest';

class Api extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.HOSTNAME || process.env.LOCALHOST}api`;
  }

  async logIn({ email, password }) {
    const { user, error } = await this.post('/auth', { email, password });
    return ({
      user,
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
    const {
      _id: id,
      complete,
      createdAt,
      updatedAt
    } = todo
    return ({
      id,
      text: todo.text,
      complete,
      userId: todo.userId._id,
      createdAt,
      updatedAt
    })
  }

  async fetchTodos({ page, sort, limit }) {
    const response = this.get('/fetchTodos', { page, sort, limit })
    return response
  }
}

export default Api
