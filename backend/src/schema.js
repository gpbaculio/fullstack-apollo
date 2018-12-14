import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    viewer: User
  }
  type Mutation {
    signUp(email: String, password: String): SignUpResponse
  }
  type SignUpResponse {
    error: String
    email: String
  }
  type User {
    id: ID!
    email: String!
  }
`;

module.exports = typeDefs;
