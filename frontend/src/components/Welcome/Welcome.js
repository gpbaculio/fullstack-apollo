import React from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import { SignUpForm } from '../Forms'
import Loading from '../Loading'

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password)
  }
`;

function Welcome() {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={SIGNUP_USER}
          onCompleted={() => {
            client.writeData({
              data: {
                signUp: { __typename: 'SignUpState', success: true, message: 'Sign Up Successful' }
              }
            });
          }}
          onError={() => {
            client.writeData({
              data: {
                signUp: { __typename: 'SignUpState', success: false, message: 'Sign Up Failed' }
              }
            });
          }}
        >
          {(signUp, attr = {}) => {
            // this loading state will probably never show, but it's helpful to
            // have for testing
            if (attr.loading) return <Loading loading={attr.loading} />;
            if (attr.error) return <p>An error occurred</p>;

            return <SignUpForm signUp={signUp} />;
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  )
}

export default Welcome