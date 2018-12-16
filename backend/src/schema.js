import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    viewer(page: Int): User
  }
  type Todo {
    id: ID!
    text: String!
    complete: Boolean!
    userId: String!
    createdAt: String!
    updatedAt: String!
  }
  type User {
    id: ID!
    email: String!
    confirmed: Boolean!
    todos: [Todo]
  }
  type Mutation {
    signUp(email: String!, password: String!): SignUpResponse!
    logIn(email: String!, password: String!): LogInResponse!
    addTodo(text: String!): AddTodoResponse!
  }
  type SignUpResponse {
    error: String
    email: String
  }
  type LogInResponse {
    error: String
    user: UserLogInResponse
  }
  type UserLogInResponse {
    id: ID!
    confirmed: Boolean!
    token: String!
    email: String!
  }
  type AddTodoResponse {
    todo: Todo
  }
`;

module.exports = typeDefs;
