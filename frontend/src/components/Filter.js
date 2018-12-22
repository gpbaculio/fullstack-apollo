import React from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo'
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


const Filter = () => (
  <ApolloConsumer>
    {client => {
      const { viewer } = client.readQuery({ query: FETCH_VIEWER })
      return (
        <Container>
          <Row className="my-3">
            <Col lg="2" className="d-flex justify-content-center align-items-center">
              Total: {viewer.todosCount}
            </Col>
            <Col lg="8" className="filter d-flex justify-content-center align-items-center">
              <div className="d-flex align-items-center">
                <Mutation mutation={TOGGLE_COMPLETE}>
                  {mutate => {
                    const allCompleted = every(map(viewer.todos, ({ complete }) => complete), c => c === true)
                    const completedIds = map(filter(viewer.todos, ({ complete }) => complete === true), ({ _id }) => _id)
                    const inCompleteIds = map(filter(viewer.todos, ({ complete }) => complete === false), ({ _id }) => _id)
                    console.log('allCompleted = ', allCompleted)
                    console.log('completedIds = ', completedIds)
                    console.log('inCompleteIds = ', inCompleteIds)
                    return (
                      <Input
                        onChange={() => {
                          const input = {}
                          const updateFragment = ({ _ids, complete }) => {
                            _ids.forEach(_id => {
                              client.writeFragment({ // we render todos on Todos component from client readQuery
                                id: _id,
                                fragment: gql`
                                  fragment ToggleCompleteFragment on Todo {
                                    __typename
                                    _id
                                    complete
                                  }
                                `,
                                data: {
                                  __typename: 'Todo',
                                  _id,
                                  complete,
                                },
                              });
                            })
                          }
                          if (allCompleted) {
                            input._ids = completedIds
                            input.complete = false
                            updateFragment({ _ids: completedIds, complete: false })
                          } else {
                            input._ids = inCompleteIds // pass as an array because we can use this mutation for multiple todos
                            input.complete = true // the opposite value of boolean will be set to the selected todo
                            updateFragment({ _ids: inCompleteIds, complete: true })
                          }
                          return mutate({
                            variables: {
                              input
                            },
                          })
                        }}
                        checked={allCompleted}
                        type="checkbox"
                        className="mt-0"
                      />
                    )
                  }}
                </Mutation>
                Select All
            </div>
              <div className="nav-container d-flex justify-content-around">
                <Button
                  size="md"
                  color="link"
                  name="all"
                >
                  All
              </Button>
                <Button
                  size="md"
                  color="link"
                  name="active" // complete = false
                >
                  Active
              </Button>
                <Button
                  size="md"
                  color="link"
                  name="complete"
                >
                  Completed
              </Button>
              </div>
            </Col>
            <Col lg="2" className="d-flex align-items-center justify-content-center">
              <Button
                size="md"
                color="link"
              >
                Clear Completed
                </Button>
            </Col>
          </Row>
        </Container>
      )
    }}
  </ApolloConsumer>
)

export default Filter
