import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Subscription {
    todoAdded: Todo
    todoUpdatedText: Todo
  }
  type Query {
    viewer(page: Int, sort: String, search: String): User
  }
  type Todo {
    _id: ID!
    text: String!
    complete: Boolean!
    createdAt: String!
    updatedAt: String!
    userId: String!
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
    toggleComplete(input: ToggleCompleteInput!): ToggleCompleteResponse!
    clearCompleted(input: ClearCompletedInput!): ClearCompletedResponse!
  }
  input ClearCompletedInput {
    _ids: [ID]!
  }
  type ClearCompletedResponse {
    clearedIds: [ID]!
  }
  input ToggleCompleteInput {
    _ids: [ID]!
    complete: Boolean!
  }
  type ToggleCompleteResponse {
    toggledIds: [ID]!
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
  type LogInError {
    email: String
    password: String
  }
  type LogInResponse {
    error: LogInError
    token: String
  }
  type AddTodoResponse {
    todo: Todo
  }
  type UpdateTodoTextResponse {
    todo: Todo
  }
`;

module.exports = typeDefs;
