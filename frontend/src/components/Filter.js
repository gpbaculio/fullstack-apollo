import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Input,
  Button
} from 'reactstrap'

class Filter extends Component {
  render() {
    return (
      <Container>
        <Row className="my-3">
          <Col lg="2" className="d-flex justify-content-center align-items-center">
            Total: 2
          </Col>
          <Col lg="8" className="filter d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center">
              <Input
                onChange={this.handleInputCheck}
                type="checkbox"
                className="mt-0"
              />
              Select All
            </div>
            <div className="nav-container d-flex justify-content-around">
              <Button
                onClick={this.handleFilterLinkClick}
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
  }
}

export default Filter
