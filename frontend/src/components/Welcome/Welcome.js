import React from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import { SignUpForm } from '../Forms'

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      error
    }
  }
`;

function Welcome() {
  return (
    <ApolloConsumer>
      {() => (
        <Mutation
          mutation={SIGNUP_USER}
        >
          {(signUp, attr = {}) => {
            if (attr.error) return <p>An error occurred</p>;
            return (
              <SignUpForm
                {...attr}
                signUp={signUp}
              />
            )
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default Welcome