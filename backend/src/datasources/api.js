import { RESTDataSource } from 'apollo-datasource-rest';

class Api extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.HOSTNAME || process.env.LOCALHOST}api`;
  }

  async logIn({ email, password }) {
    const { data } = await this.post('/auth', { email, password });
    return data.user;
  }

  async signUp({ email, password }) {
    const response = await this.post('/user', { email, password })
    return {
      error: response.error,
      email: response.email
    }
  }
}

export default Api
