import React, { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DetailCard from './DetailCard';

const LendingCard = () => {
  return <Card className="px-5 w-100 mt-5">
    <Card.Body>
      <Container fluid>
        <Row className="justify-content-center">
          <h1>100 Dai</h1>
        </Row>
        <Row>
          <Button block>Supply</Button>
        </Row>
      </Container>
    </Card.Body>
  </Card>;
}


const RewardsCard = () => {
  return <Card className="px-5 w-100 mt-5">
    <Card.Body>
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={10}>
            <h6 className="d-inline-block">Earned</h6>
            <h6 className="d-inline-block float-right">6 Dai</h6>
          </Col>
          <Col xs={2}>
            <Button variant="success">Claim</Button>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>;
}

export const LendingSection = () => {
  return <Container fluid className="px-0">
    <Row>
      <Col xs={12} md={6}>
        <DetailCard callout={"100 DAI"} detail={"Balance"} />
      </Col>
      <Col xs={12} md={6}>
        <DetailCard callout={"7.43%"} detail={"APY"} />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <LendingCard />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <RewardsCard />
      </Col>
    </Row>
  </Container>
}