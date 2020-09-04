import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export default () => {
  return <Card className="outstanding-loan-card w-100 mb-5">
    <Card.Title>
      <Row className="justify-content-center mt-5">
        <h5 className="text-muted">Outstanding Loan</h5>
      </Row>
    </Card.Title>
    <Card.Body>
      <Container fluid>
        <Row>
          <Table hover>
            <tbody>
              <tr>
                <td><p className="font-weight-bold">Loan #23</p></td>
                <td><p className="font-weight-bold float-right">10 DAI</p></td>
              </tr>
              <tr>
                <td>Due date</td>
                <td><p className="float-right">06/01/2020</p></td>
              </tr>
              <tr>
                <td>Interest rate</td>
                <td><p className="float-right">18% APY</p></td>
              </tr>
              <tr>
                <td>Owed</td>
                <td><p className="float-right">1 DAI</p></td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col xs={12}>
            <Button variant="outline-primary" block>Repay</Button>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>;
};
