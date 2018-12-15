import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    viewer: User
  }
  type User {
    id: ID!
    email: String!
    confirmed: Boolean!
  }
  type Mutation {
    signUp(email: String!, password: String!): SignUpResponse!
    logIn(email: String!, password: String!): LogInResponse!
    addTodo(text: String!): TodoResponse!
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
  type TodoResponse {
    todo: Todo
  }
  type Todo {
    id: ID!
    text: String!
    complete: Boolean!
    userId: String!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = typeDefs;
