import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    signUpSuccess: Boolean!
    signUp: SignUpState!
  }
  extend type SignUpState {
    error: String!
    message: String!
  }
`;

