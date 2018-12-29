import React from 'react'
import { Mutation, ApolloConsumer, Query } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'
import uuidv1 from 'uuid/v1';

import { AddTodo, Search } from '../Forms'
import Todos from './Todos';
import Filter from '../Filter'

import { VIEWER, CLIENT } from '../../App'

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    __typename
    addTodo(text: $text) {
      __typename
      todo {
        __typename
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
    <ApolloConsumer>
      {client => (
        <Query query={CLIENT}>
          {({ data: { sort } }) => (
            <Query query={VIEWER}>
              {({ data: { viewer } }) => (
                <React.Fragment>
                  <Container>
                    <Row>
                      <Col xs="12" md="6">
                        {viewer.confirmed ? (
                          <Mutation
                            mutation={ADD_TODO}
                          >
                            {mutate => (
                              <AddTodo
                                submit={({ text }) => {
                                  const now = new Date().toISOString()
                                  const _id = uuidv1()
                                  const mockTodo = {
                                    __typename: "Todo",
                                    _id,
                                    text,
                                    complete: false,
                                    createdAt: now,
                                    updatedAt: now,
                                  }
                                  if (sort !== 'complete') {
                                    client.writeQuery({
                                      query: VIEWER,
                                      data: {
                                        __typename: 'Query',
                                        viewer: {
                                          __typename: 'User',
                                          ...viewer,
                                          todos: [{ ...mockTodo }, ...viewer.todos],
                                          todosCount: viewer.todosCount + 1
                                        },
                                      }
                                    })
                                  }
                                  return mutate({
                                    variables: { text },
                                    optimisticResponse: {
                                      __typename: "Mutation",
                                      addTodo: {
                                        __typename: "AddTodoResponse",
                                        todo: { ...mockTodo }
                                      }
                                    },
                                    update: (proxy, { data: { addTodo: { todo } } }) => {
                                      const data = proxy.readQuery({ query: VIEWER })
                                      proxy.writeQuery({
                                        query: VIEWER,
                                        data: {
                                          __typename: 'Query',
                                          viewer: {
                                            ...data.viewer,
                                            todos: data.viewer.todos.map(t => {
                                              if (t._id === _id) {
                                                return ({ ...todo })
                                              }
                                              return t
                                            }),
                                          }
                                        }
                                      });
                                    }
                                  })
                                }}
                              />
                            )}
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
                  </Container>
                  <Filter />
                  <Todos />
                </React.Fragment>
              )}
            </Query>
          )}
        </Query>
      )}
    </ApolloConsumer>
  )
}

export default Home
