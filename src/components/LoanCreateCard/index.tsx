import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import * as eth from './../../../dist/assets/eth-diamond-glyph.black.png';
import * as dai from './../../../dist/assets/dai.png';

import './index.scss';

export default () => {
  return <Card className="loan-create-card mt-5 w-100 shadow">
    <Card.Header>
      <Row className="justify-content-center">
          <h1>2 ETH</h1>
          <img className="eth" src={eth.default} />
      </Row>
    </Card.Header>
    <Card.Body>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <h6 className="d-inline-block">Borrow Assets</h6>
            <h6 className="d-inline-block float-right">DAI Stablecoin</h6>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <h1 className="d-inline-block">◈ 100</h1>
          <img className="dai" src={dai.default} />
        </Row>
        <Row className="justify-content-center">
          <Table hover>
            <tbody>
              <tr>
                <td>Owed</td>
                <td><p className="float-right">◈ 110</p></td>
              </tr>
              <tr>
                <td>Due Date</td>
                <td><p className="float-right">08/02/2020</p></td>
              </tr>
              <tr>
                <td>Interest Rate</td>
                <td><p className="float-right">14.43% APY</p></td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col xs={{ span: 12 }}>
            <Button variant="outline-primary" block>Borrow</Button>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>;
};
