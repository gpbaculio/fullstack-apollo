import React from 'react'
import { ApolloConsumer, Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import map from 'lodash/map'
import every from 'lodash/every'
import filter from 'lodash/filter'
import {
  Container,
  Row,
  Col,
  Input,
  Button
} from 'reactstrap'

import { FETCH_VIEWER } from '../App';
import { TOGGLE_COMPLETE } from './Home/Todos/Todo'

export const CLEAR_COMPLETED = gql`
  mutation ClearCompleted($input: ClearCompletedInput!) {
    __typename
    clearCompleted(input: $input) {
      __typename
      clearedIds # the deleted _id
    }
  }
`;

export const SORT = gql`
  query SORT {
    sort @client 
  }
`;

const Filter = () => (
  <ApolloConsumer>
    {client => (
      <Query query={FETCH_VIEWER}>
        {({ data: { viewer, sort, page }, refetch, error }) => {
          const getIdsByComplete = bool => map(
            filter(
              viewer.todos,
              ({ complete }) => complete === bool
            ),
            ({ _id }) => _id
          )
          const allCompleted = every(
            map(
              viewer.todos,
              ({ complete }) => complete
            ),
            c => c === true
          )

          const updateFragment = async ({ _ids, complete }) => {
            _ids.forEach(_id => {
              client.writeFragment({ // we render todos on Todos component from client readQuery
                id: _id,
                fragment: gql`
                    fragment ToggleCompleteFragment on Todo {
                      __typename
                      _id
                      complete
                      updatedAt
                    }
                  `,
                data: {
                  __typename: 'Todo',
                  _id,
                  complete,
                  updatedAt: new Date().toISOString(),
                },
              });
            })
          }
          const completedIds = getIdsByComplete(true)
          const inCompleteIds = getIdsByComplete(false)

          if (error) return `Error!: ${error}`;

          return (
            <Container>
              <Row className="my-3">
                <Col lg="2" className="d-flex justify-content-center align-items-center">
                  Total: {viewer.todosCount}
                </Col>
                <Col lg="8" className="filter d-flex justify-content-center align-items-center">
                  <div className="d-flex align-items-center">
                    <Mutation
                      mutation={TOGGLE_COMPLETE}
                    >
                      {(toggleComplete) => (
                        <Input
                          onChange={async () => {
                            const input = {}
                            if (allCompleted) {
                              input._ids = completedIds
                              input.complete = false
                              updateFragment({ _ids: completedIds, complete: false })
                            } else {
                              input._ids = inCompleteIds // pass as an array because we can use this mutation for multiple todos
                              input.complete = true // the opposite value of boolean will be set to the selected todo
                              updateFragment({ _ids: inCompleteIds, complete: true })
                            }
                            await toggleComplete({ variables: { input } }) // wait for the mutation so on refetch we get updated data
                            if (sort !== 'all') {
                              client.writeData({ data: { todosRefetching: true } })
                              await refetch({ page: page > 1 ? page - 1 : page, sort })
                              client.writeData({ data: { todosRefetching: false } })
                            }
                          }}
                          disabled={!viewer.todosCount}
                          checked={allCompleted}
                          type="checkbox"
                          className="mt-0"
                        />
                      )}
                    </Mutation>
                    {allCompleted ? 'Deselect All' : 'Select All'}
                  </div>
                  <div className="nav-container d-flex justify-content-around">
                    <Button
                      size="md"
                      color="link"
                      name="all"
                      onClick={async () => {
                        client.writeData({ data: { todosRefetching: true } })
                        await refetch({ page: 1, sort: 'all' })
                        client.writeData({ data: { sort: 'all', page: 1, todosRefetching: false } })
                      }}
                      disabled={sort === 'all'}
                    >
                      All
                        </Button>
                    <Button
                      size="md"
                      color="link"
                      name="active" // complete = false
                      onClick={async () => {
                        client.writeData({ data: { todosRefetching: true } })
                        await refetch({ page: 1, sort: 'active' })
                        client.writeData({ data: { sort: 'active', page: 1, todosRefetching: false } })
                      }}
                      disabled={sort === 'active'}
                    >
                      Active
                        </Button>
                    <Button
                      size="md"
                      color="link"
                      name="complete"
                      onClick={async () => {
                        client.writeData({ data: { todosRefetching: true } })
                        await refetch({ page: 1, sort: 'complete' })
                        client.writeData({ data: { sort: 'complete', page: 1, todosRefetching: false } })
                      }}
                      disabled={sort === 'complete'}
                    >
                      Completed
                        </Button>
                  </div>
                </Col>
                <Col lg="2" className="d-flex align-items-center justify-content-center">
                  <Mutation mutation={CLEAR_COMPLETED}>
                    {mutate => (
                      <Button
                        size="md"
                        color="link"
                        disabled={!completedIds.length}
                        onClick={() => {
                          client.writeQuery({
                            query: FETCH_VIEWER,
                            data: {
                              viewer: {
                                ...viewer,
                                todos: viewer.todos.filter(({ _id }) => !completedIds.includes(_id)),
                                todosCount: viewer.todosCount - completedIds.length
                              }
                            }
                          })
                          mutate({
                            variables: {
                              input: { _ids: completedIds }
                            },
                          })
                        }}
                      >
                        Clear Completed
                      </Button>
                    )}
                  </Mutation>
                </Col>
              </Row>
            </Container>
          )
        }}
      </Query>
    )}
  </ApolloConsumer>
)

export default Filter
