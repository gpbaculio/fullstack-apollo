import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    logIn: LogInState!
    signUp: SignUpState!
  }
  extend type SignUpState {
    success: Boolean!
    email: String!
  }
  extend type LogInState {
    isLoggedIn: Boolean
    user: User!
  }
  extend type User {
    email: String!
    confirmed: Boolean!
    token: String!
  }
`;

