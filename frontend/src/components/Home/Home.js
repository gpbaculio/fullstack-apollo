import React, { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { AddTodo, Search } from '../Forms'

const IS_LOGGED_IN = gql`
  query LogInState {
    logIn @client {
      user {
        confirmed
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      todo {
        id
        text
        complete
        userId
        createdAt
        updatedAt
      }
    }
  }
`;

function Home() {
  return (
    <Container>
      <Row>
        <Query query={IS_LOGGED_IN}>
          {({ data: { logIn: { user: { confirmed } } } }) => (
            <Fragment>
              <Col xs="12" md="6">
                {confirmed ? (
                  <Mutation
                    mutation={ADD_TODO}
                  // update <- to add update attribute when fetching todos is ready
                  >
                    {(addTodo, attr = {}) => {
                      if (attr.error) return <p>An error occurred</p>;
                      return <AddTodo addTodo={addTodo} {...attr} />
                    }}
                  </Mutation>
                ) : (
                    <Alert className="text-center mx-auto mt-4 mb-xs-1 mb-md-5" color="primary">
                      Please confirm your account to Add Todo
                </Alert>
                  )}
              </Col>
              <Col xs="12" md="6">
                <Search />
              </Col>
            </Fragment>
          )}
        </Query>
      </Row>
    </Container>
  )
}

export default Home
