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
    console.log('email = ', email)
    const { data } = await this.post('/user', { email, password })
    return data.error
  }
}

export default Api
