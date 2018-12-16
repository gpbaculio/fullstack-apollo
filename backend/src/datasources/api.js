import { RESTDataSource } from 'apollo-datasource-rest';
import { normalize, schema } from "normalizr";

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
      id,
      complete,
      createdAt,
      updatedAt
    } = todo
    return ({
      id,
      text: todo.text,
      complete,
      userId: todo.userId.id,
      createdAt,
      updatedAt
    })
  }

  async fetchTodos({ user, query: { offset, limit } }) {
    if (!user) return null
    const response = await this.get('/todo/fetchTodos', { id: user.id, offset, limit })
    const todo = new schema.Entity('todos');;
    const result = normalize(response, {
      todos: [todo],
    })
    console.log('FETCH TODOS NORMALIZR = ', result)
    return result
  }
}

export default Api
