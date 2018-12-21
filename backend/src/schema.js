import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    viewer(page: Int): User
  }
  type Todo {
    _id: ID!
    text: String!
    complete: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type User {
    id: ID!
    email: String!
    confirmed: Boolean!
    todos: [Todo]
    todosCount: Int
  }
  input UpdateTodoTextInput {
    _id: ID!
    text: String!
  }
  type Mutation {
    signUp(email: String!, password: String!): SignUpResponse!
    logIn(email: String!, password: String!): LogInResponse!
    addTodo(text: String!): AddTodoResponse!
    updateTodoText(input: UpdateTodoTextInput!): UpdateTodoTextResponse!
    deleteTodo(input: DeleteTodoInput!): DeleteTodoResponse!
  }
  input DeleteTodoInput {
    _id: ID!
  }
  type DeleteTodoResponse {
    _id: ID!
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
  type UpdateTodoTextResponse {
    todo: Todo
  }
`;

module.exports = typeDefs;
