import React, { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DetailCard from './../DetailCard';

import './index.scss';

import * as dai from './../../../dist/assets/dai.png';

const LendingCard = () => {
  return <Card className="lending-card px-5 w-100 shadow">
    <Card.Body>
      <Container fluid>
        <Row className="justify-content-center">
          <h1 className="mt-5 font-weight-bold">◈ 100</h1>
          <img className="dai" src={dai.default} />
        </Row>
        <Row>
          <Button className="supply-button" variant="outline-primary" block>Supply</Button>
        </Row>
      </Container>
    </Card.Body>
  </Card>;
}


const RewardsSection = () => {
  return <Row className="rewards-section">
    <Col className="mt-5" xs={12} md={10}>
      <Card className="rewards-card w-100">
        <Card.Body>
          <h6 className="d-inline-block">Earned</h6>
          <h6 className="d-inline-block float-right">◈ 6<img className="dai" src={dai.default} /></h6>
        </Card.Body>
      </Card>
    </Col>
    <Col className="mt-5" xs={12} md={2}>
      <Button className="rewards-button w-100 h-100" variant="outline-success">Claim</Button>
    </Col>
  </Row>
  return ;
}

export const LendingSection = () => {
  return <Container fluid className="px-0">
    <Row>
      <Col sm={12} md={6}>
        <DetailCard callout={"◈ 100"} detail={"Balance"} />
      </Col>
      <Col sm={12} md={6}>
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
        <RewardsSection />
      </Col>
    </Row>
  </Container>
}
