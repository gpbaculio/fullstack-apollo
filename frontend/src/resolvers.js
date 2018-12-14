import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    signUp: SignUpState!
  }
  extend type SignUpState {
    success: Boolean!
    message: String!
  }
`;

