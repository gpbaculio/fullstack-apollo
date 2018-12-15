import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
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


function Home() {
  return (
    <Container>
      <Row>
        <Query query={IS_LOGGED_IN}>
          {({ data: { logIn: { user: { confirmed } } } }) => (
            <Fragment>
              <Col xs="12" md="6">
                {confirmed ? <AddTodo /> : (
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
