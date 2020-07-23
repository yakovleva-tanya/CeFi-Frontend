import React, { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { BorrowTOSModal, IConfirm, defaultIConfirm }  from './../../components/BorrowTOSModal';
import { CollateralAdjustModal, defaultICollateral, ICollateralAdjust, CollateralAdjustType }  from './../../components/CollateralAdjustModal';
import Notify from "./../../models/Web3Notify";
import { AppContext, AppContextState } from "./../../context/app";
import { Formik } from 'formik';
import { globalDecimals } from "./../../util/constants";

import * as eth from './../../../dist/assets/eth-diamond-glyph.black.png';
import * as dai from './../../../dist/assets/dai.png';
import * as plus from './../../../dist/assets/plus.svg';
import * as minus from './../../../dist/assets/minus.svg';

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

interface CompleteBorrowFormProps {
  state: any;
  updateAppState: Function;
  toggleModal: Function;
}

const completeBorrowForm = ({ state, updateAppState, toggleModal }: CompleteBorrowFormProps) => (values: any, { setSubmitting }: any) => {
  const amount = values.amount;
  const primaryAddress = state.web3State.address;
  const contract = state.zeroCollateral.contract;

  const defer = async (p: Promise<any>) => {
    try {
      await p;
      // await borrowDai(contract, primaryAddress, amount);
      setSubmitting(false);
      updateAppState((st: AppContextState) => {
        const zeroCollateral = st.zeroCollateral;
        zeroCollateral.borrowed = true;
        return { ...st, zeroCollateral };
      });
    } catch {
      toggleModal({ open: false, run: () => 1 });
    }
  };
  
  toggleModal({ run:defer, open: true });

};

const borrowFormValidation = (values: any) => {
  const errors = {};
  return errors;
};

export default function LoanCreateCard() {
  const { state, updateAppState } = useContext(AppContext);

  const [showModal, toggleModal] = useState<IConfirm>(defaultIConfirm);
  const  [adjustCollateralModal, adjustCollateralToggleModal] = useState<ICollateralAdjust>(defaultICollateral);

  const showDepositCollateral = () => adjustCollateralToggleModal({
    open: true,
    current: 0,
    type: CollateralAdjustType.Deposit,
    run: () => 1,
  });
  const showWithdrawCollateral = () => adjustCollateralToggleModal({
    open: true, 
    current: 0,
    type: CollateralAdjustType.Withdraw,
    run: () => 1,
  });

  const initialBorrowValues = { amount: 100 };
  const hasWeb3 = state.web3State?.web3;

  const plaidLoggedIn = state.plaid.loggedIn;

  return <Card className="loan-create-card mt-5 mb-5 w-100 shadow">
    <Card.Header>
      <Row>
        <Col>
          <Button className="collateral-btn" type="submit" disabled={!hasWeb3} variant="outline-light" onClick={showWithdrawCollateral} block>
            <img className="minus" src={minus.default} />
          </Button>
        </Col>
        <Col>
          <Row className="justify-content-center">
            <h1>2 ETH</h1>
            <img className="eth" src={eth.default} />
          </Row>
          <Row className="justify-content-center">
            <h5 className="text-muted">Collateral Balance</h5>
          </Row>
        </Col>
        <Col>
          <Button className="float-right collateral-btn" type="submit" disabled={!hasWeb3} variant="outline-light" onClick={showDepositCollateral} block>
            <img className="plus" src={plus.default} />
          </Button>
        </Col>
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
          <Col xs={{span: 4 }}>
            <Formik
              initialValues={initialBorrowValues}
              validate={borrowFormValidation}
              onSubmit={completeBorrowForm({ state, updateAppState, toggleModal })}
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
                    <Col>
                      <Form.Group as={Row}>
                        <Form.Label column sm={2}><img className="dai" src={dai.default} /></Form.Label>
                        <Form.Control
                          className="amount"
                          type="number"
                          name="amount"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.amount}
                        />
                      </Form.Group>
                      <Row>
                        <Table hover>
                          <tbody>
                            <tr>
                              <td>Owed</td>
                              <td><p className="float-right">110 DAI</p></td>
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
                        <Button type="submit" disabled={isSubmitting || !hasWeb3} className="supply-button mb-3" variant="primary" block>Borrow</Button>
                      </Row>
                    </Col>
                  </Form>
                )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </Card.Body>
    <BorrowTOSModal showModal={showModal} toggleModal={toggleModal} />
    <CollateralAdjustModal showModal={adjustCollateralModal} toggleModal={adjustCollateralToggleModal} />
  </Card>;
}
