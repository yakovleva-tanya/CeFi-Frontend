import React, { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DetailCard from './../DetailCard';
import BorrowingAccountLink from './../BorrowingAccountLink';
import LoanCreateCard from './../LoanCreateCard';
import OutstandingLoanCard from './../OutstandingLoanCard';

import './index.scss';

export const BorrowingSection = () => {
  return <Container fluid className="borrowing-section px-0">
    <Row>
      <Col xs={12} md={4}>
        <DetailCard callout={"◈ 1000"} detail={"Max. Loan"} />
      </Col>
      <Col xs={12} md={4}>
        <DetailCard callout={"18.45%"} detail={"APY"} />
      </Col>
      <Col xs={12} md={4}>
        <DetailCard callout={"75%"} detail={"Collateral Percent"} />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <BorrowingAccountLink />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <LoanCreateCard />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>

        <OutstandingLoanCard />
      </Col>
    </Row>
  </Container>
}
