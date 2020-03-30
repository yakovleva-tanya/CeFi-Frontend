import React, { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Notify from "./../../models/Web3Notify";
import { AppContext, AppContextState } from "./../../context/app";
import { Formik } from 'formik';
import { globalDecimals } from "./../../util/constants";

import * as eth from './../../../dist/assets/eth-diamond-glyph.black.png';
import * as dai from './../../../dist/assets/dai.png';

import './index.scss';

function borrowDai(contract: any, primaryAddress: string, amount: number) {
  const days = 10;
  return new Promise((resolve, reject) => contract.methods.createBorrow(
      (globalDecimals*amount).toLocaleString('fullwide', { useGrouping:false }),
      (days).toLocaleString('fullwide', { useGrouping:false })
    )
    .send({ from: primaryAddress })
    .on('transactionHash', Notify.hash)
    .on('receipt', resolve)
    .on('error', reject)
  );
}

const completeBorrowForm = (state: any, updateAppState: Function) => async (values: any, { setSubmitting }: any) => {
  const amount = values.amount;
  const primaryAddress = state.web3State.address;
  const contract = state.zeroCollateral.contract;

  await borrowDai(contract, primaryAddress, amount);
  setSubmitting(false);
  updateAppState((st: AppContextState) => {
    const zeroCollateral = st.zeroCollateral;
    zeroCollateral.borrowed = true;
    return { ...st, zeroCollateral };
  });
};

const borrowFormValidation = (values: any) => {
  const errors = {};
  return errors;
};

export default function LoanCreateCard() {
  const { state, updateAppState } = useContext(AppContext);
  const initialBorrowValues = { amount: 100 };
  const hasWeb3 = state.web3State?.web3;

  const plaidLoggedIn = state.plaid.loggedIn;

  return <Card className="loan-create-card mt-5 mb-5 w-100 shadow">
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
        <Row className="justify-content-center mt-5">
          <Col xs={{span: 4, offset: 0 }}>
            <Formik
              initialValues={initialBorrowValues}
              validate={borrowFormValidation}
              onSubmit={completeBorrowForm(state, updateAppState)}
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
                    <Button type="submit" disabled={isSubmitting || !hasWeb3} className="supply-button mb-3" variant="outline-primary" block>Borrow</Button>
                  </Form>
                )}
            </Formik>
          </Col>
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
                <td><p className="float-right">{plaidLoggedIn ? "18%" : "24%"}</p></td>
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
