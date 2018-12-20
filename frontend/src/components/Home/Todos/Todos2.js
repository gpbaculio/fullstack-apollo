import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { Container, Row } from 'reactstrap'
import Pagination from 'react-js-pagination'
import Loading from '../../Loading'

import Todo from './Todo'

import { FETCH_VIEWER, PAGE } from '../../../App'

const REFETCHING = gql`
  query todosRefetching {
    todosRefetching @client 
  }
`;

class Todos2 extends React.Component {

  state = {
    activePage: 1
  }

  onPageChange = page => {
    this.setState({ activePage: page })
  }

  render() {
    const { activePage } = this.state
    return (
      <ApolloConsumer>
        {client => {
          const { page } = client.readQuery({ query: PAGE })
          const { viewer: { todos, todosCount } } = client.readQuery({ query: FETCH_VIEWER, variables: { page } })
          const { todosRefetching } = client.readQuery({ query: REFETCHING })
          console.log('todosRefetching = ', todosRefetching)
          return (
            <Container>
              <Row style={{ minHeight: '60vh' }}>
                {todosRefetching ? (
                  <div className="position-relative w-100">
                    <Loading loading={todosRefetching} />
                  </div>
                ) : (
                    todos.map(todo => (
                      <Todo key={todo._id} todo={todo} />
                    )))}
              </Row>
              <Row className="justify-content-center mt-2">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={9}
                  totalItemsCount={todosCount}
                  pageRangeDisplayed={5}
                  onChange={async (currentPage) => {
                    this.onPageChange(currentPage)
                    client.writeData({ data: { todosRefetching: true } })
                    const watchQuery = client.watchQuery({
                      query: FETCH_VIEWER,
                      fetchPolicy: 'cache-and-network',
                    });
                    watchQuery.refetch({ page: currentPage })
                  }}
                />
              </Row>
            </Container>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default Todos2
