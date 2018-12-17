import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    signUp: SignUpState!
    currentUser: CurrentUser!
  }
  extend type SignUpState {
    success: Boolean!
    email: String!
  }
  extend type CurrentUser {
    id: ID!
    email: String!
    confirmed: Boolean!
    token: String
  }
`;

