import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as eth from './../../../dist/assets/eth-diamond-glyph.black.png';

import './index.scss';

export enum CollateralAdjustType {
  Deposit,
  Withdraw
}

export interface ICollateralAdjust {
  open: boolean;
  current: Number | null;
  type: CollateralAdjustType;
  run: Function;
}

interface CollateralAdjustModalProps {
  showModal: ICollateralAdjust;
  toggleModal: Function;
}

export const defaultICollateral: ICollateralAdjust = {
  open: false,
  run: () => 1,
  type: CollateralAdjustType.Deposit,
  current: null
};

interface AdjustHeaderProps {
  type: CollateralAdjustType;
}

const AdjustHeader = ({ type }: AdjustHeaderProps) => {
  if (type === CollateralAdjustType.Deposit) {
    return <h3>Add Collateral</h3>
  } else {
    return <h3>Withdraw Collateral</h3>
  }
};

const validation = (values: any) => {
  const errors = {};
  return errors;
};

export const CollateralAdjustModal = ({ showModal, toggleModal }: CollateralAdjustModalProps) => {

  const { run, open, current, type } = showModal;
  const initialValues = {
    amount: 0,
    limit: current
  };


  function reject () {
    return (run) && run(Promise.reject()) && toggleModal(defaultICollateral);
  }

  function confirm () {
    return (run) && run(Promise.resolve()) && toggleModal(defaultICollateral);
  }

  const completeForm = (values: any, { setSubmitting }: any) => {
    setSubmitting(false);
    toggleModal(defaultICollateral);
  }; 

  return (<Modal show={open} onHide={reject} size={'lg'}>
    <Modal.Header closeButton>
      <Modal.Title><AdjustHeader type={type} /></Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container className='collateral-adjust-modal'>
        <Card className="p-2 m-2" style={{ width: '100%' }}>
          <Card.Body>
            <Card.Text>
              <Formik
                initialValues={initialValues}
                validate={validation}
                onSubmit={completeForm}
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
                          <Form.Label column sm={2}><img className="eth" src={eth.default} /></Form.Label>
                          <Col sm="10" className="amount-container">
                            <Form.Control
                              className="amount"
                              type="number"
                              name="amount"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.amount}
                            />
                          </Col>
                        </Form.Group>
                        <Row>
                          <Button type="submit" disabled={isSubmitting} className="supply-button mb-3" variant="outline-primary" block>Confirm</Button>
                        </Row>
                      </Col>
                    </Form>
                  )}
              </Formik>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Modal.Body>
  </Modal>);
};
