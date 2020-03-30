import React, { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import DetailCard from './../DetailCard';
import Notify from "./../../models/Web3Notify";
import { AppContext, AppContextState } from "./../../context/app";
import Alert from 'react-bootstrap/Alert';
import { globalDecimals } from "./../../util/constants";

import './index.scss';

import * as dai from './../../../dist/assets/dai.png';

const supployFormValidation = (values: any) => {
    const errors = {};
    return errors;
};

function approveContract(contract: any, zeroCollateralAddress: string, primaryAddress: string, amount: number) {
  return new Promise((resolve, reject) => contract.methods
    .approve(
      zeroCollateralAddress,
      (globalDecimals*amount).toLocaleString('fullwide', { useGrouping:false })
    )
    .send({ from: primaryAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}

function mintZDai(contract: any, primaryAddress: string, amount: number) {
  return new Promise((resolve, reject) => contract.methods.mintZDAI(
      (globalDecimals*amount).toLocaleString('fullwide', { useGrouping:false })
    )
    .send({ from: primaryAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}

const completeLendingForm = (state: any, updateAppState: Function) => async (values: any, { setSubmitting }: any) => {
  const amount = values.amount;
  const primaryAddress = state.web3State.address;
  const contract = state.zeroCollateral.contract;
  const daiContract = state.zeroCollateral.daiContract;
  const zeroCollateralAddress = state.zeroCollateral.address;

  await approveContract(daiContract, zeroCollateralAddress, primaryAddress, amount);
  await mintZDai(contract, primaryAddress, amount);
  const balance = await contract.methods.balanceOf(primaryAddress).call();
  setSubmitting(false);
  updateAppState((st: AppContextState) => {
    const zeroCollateral = st.zeroCollateral;
    zeroCollateral.balance = balance;
    return { ...st, zeroCollateral };
  });
};

const LendingCard = () => {
  const { state, updateAppState } = useContext(AppContext);
  const initialSupplyValues = { amount: 100 };
  const hasWeb3 = state.web3State?.web3;

  return <Card className="lending-card px-5 w-100 shadow">
    <Card.Body>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <div className="float-left"><h4>Lend Assets</h4></div>
            <div className="float-right"><h4>Dai Stablecoin</h4></div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={{span: 4, offset: 0 }}>
            <Formik
              initialValues={initialSupplyValues}
              validate={supployFormValidation}
              onSubmit={completeLendingForm(state, updateAppState)}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}><img className="dai" src={dai.default} /></Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          name="amount"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.amount}
                        />
                      </Col>
                    </Form.Group>
                    <Button type="submit" disabled={isSubmitting || !hasWeb3} className="supply-button" variant="outline-primary" block>Supply</Button>
                  </Form>
                )}
            </Formik>
          </Col>
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
  const { state } = useContext(AppContext);
  const web3LoggedIn = state.web3State.type;
  const amount = web3LoggedIn ? state.zeroCollateral?.balance : "-";
  return <Container fluid className="px-0">
    <Row>
      <Col sm={12} md={6}>
        <DetailCard callout={"◈ " + amount} detail={"Balance"} />
      </Col>
      <Col sm={12} md={6}>
        <DetailCard callout={"7.43%"} detail={"APY"} />
      </Col>
    </Row>
    {
      !web3LoggedIn ?
      <Row>
        <Col xs={12}>
          <Alert variant="warning">
            <Alert.Heading>Connect your Ethereum account to get started.</Alert.Heading>
            <p>
              Connect your Web3 account in the top right to create a colleralized loan.
            </p>
            <hr />
            <p className="mb-0">
              Tip: After logging in, you may add your bank account to receive an even better rate!
            </p>
          </Alert>
        </Col>
      </Row> : ""
    }
    <Row className="mt-4">
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
