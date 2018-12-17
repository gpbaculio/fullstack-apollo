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
import Loading from '../Loading'

const VIEWER_DATA = gql`
  query Viewer {
    viewer @client {
      confirmed
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

const FETCH_TODOS = gql`
  query FetchViewer($page: Int!) {
    viewer(page: $page) {
      todos {
        id: _id #use alias for normalizr
        complete
        userId
        createdAt
        updatedAt
        text
      }
      todosCount
    }
  }
`

function Home() {
  return (
    <Container>
      <Query query={VIEWER_DATA}>
        {({ data: { viewer: confirmed } }) => (
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
      <Query query={FETCH_TODOS} variables={{ page: 1 }}> {/* separate this into a different component tomorrow! */}
        {({ data: { viewer }, loading, error, refetch }) => {
          if (loading) {
            return <Loading loading={loading} />
          }
          if (error) {
            return <p>Something went wrong.</p>
          }
          return (
            <Fragment>
              {viewer.todos.map(t => <p>{t.id}</p>)}
            </Fragment>
          )
        }}
      </Query>
    </Container>
  )
}

export default Home
