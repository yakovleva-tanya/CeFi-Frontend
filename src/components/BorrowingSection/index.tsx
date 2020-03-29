import React, { useContext } from "react";
import { AppContext } from "./../../context/app";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
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

  const { state} = useContext(AppContext);
  const web3LoggedIn = state.web3State.type;

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
    {
      web3LoggedIn ? <Row>
        <Col xs={12}>
          <BorrowingAccountLink />
        </Col>
      </Row> : <Alert variant="success">
        <Alert.Heading>Connect your Ethereum account to get started.</Alert.Heading>
        <p>
          Connect your Web3 account in the top right to create a colleralized loan.
        </p>
        <hr />
        <p className="mb-0">
          Tip: After logging in, you may add your bank account to receive an even better rate!
        </p>
      </Alert>
    }
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
