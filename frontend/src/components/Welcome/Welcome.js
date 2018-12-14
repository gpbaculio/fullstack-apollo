import React from 'react'
import { Mutation, ApolloConsumer, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert } from 'reactstrap'

import { SignUpForm } from '../Forms'

const SIGNUP_USER = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      error
      email
    }
  }
`;

const SIGN_UP_SUCCESS = gql`
  query SignUpSuccess {
    signUp @client {
      success
      email
    }
  }
`;

function Welcome() {
  return (
    <ApolloConsumer>
      {client => (
        <React.Fragment>
          <Query query={SIGN_UP_SUCCESS}>
            {({ data: { signUp } }) => signUp.success && (
              <Alert
                color="success"
                className="mx-auto text-center w-75 my-5"
                isOpen={Boolean(signUp.success)}
                toggle={() => client.writeData({
                  data: { signUp: { __typename: 'SignUpState', success: false, email: '' } }
                })}
              >
                <h5>{`Success! A confirmation link has been sent to ${signUp.email}`}</h5>
              </Alert>
            )}
          </Query>
          <Mutation
            mutation={SIGNUP_USER}
            onCompleted={({ signUp }) => {
              if (signUp.error === null) {
                client.writeData({
                  data: { signUp: { __typename: 'SignUpState', success: true, email: signUp.email } }
                });
              }
            }}
          >
            {(signUp, attr = {}) => {
              if (attr.error) return <p>An error occurred</p>;
              return <SignUpForm {...attr} signUp={signUp} />
            }}
          </Mutation>
        </React.Fragment>
      )}
    </ApolloConsumer>
  )
}

export default Welcome