import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'

import { AddTodo, Search } from '../Forms'
import Todos from './Todos';

const VIEWER_DATA = gql`
  query currentUser {
    currentUser @client {
      confirmed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      todo {
        _id
        text
        complete
        createdAt
        updatedAt
      }
    }
  }
`;

function Home() {
  return (
    <React.Fragment>
      <Container>
        <Query query={VIEWER_DATA}>
          {({ data: { currentUser: { confirmed } } }) => (
            <Row>
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
            </Row>
          )}
        </Query>
      </Container>
      <Todos />
    </React.Fragment>
  )
}

export default Home
