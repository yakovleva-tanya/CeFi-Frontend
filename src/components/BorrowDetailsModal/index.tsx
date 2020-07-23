import React from "react";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Formik  } from 'formik';
import * as info from './../../../dist/assets/info.svg';

import './index.scss';

export interface IConfirm {
  open: boolean;
  run: Function;
}

interface BorrowTOSModalProps {
  showModal: IConfirm;
  toggleModal: Function;
}

export const defaultIConfirm: IConfirm = { open: false, run: () => 1 };

const useTooltip = (<Tooltip id="popover-basic">
    Loan Use Details.
</Tooltip>);

export const BorrowDetailsModal = ({ showModal, toggleModal }: BorrowTOSModalProps) => {

  function reject () {
    return (showModal.run) && showModal.run(Promise.reject()) && toggleModal(defaultIConfirm);
  }

  function completeForm(values: any, { setSubmitting }: any) {
    setSubmitting(true);
    
  }

  return (<Modal show={showModal.open} onHide={reject} size={'lg'}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Borrowing Terms</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container className='borrow-tos-modal'>
        <Card className="p-2 m-2" style={{ width: '100%' }}>
          <Card.Body>
            <Formik
              initialValues={{ borrowing: 'Dai', collateral: 'Ether', loanUse: 'Float' }}
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
                    <Form.Group controlId="formBorrowedAsset">
                      <Form.Row>
                        <Form.Label column lg={2}>Borrowing: </Form.Label>
                        <Col>
                          <Form.Control
                            name="borrowing" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.borrowing}
                            as="select"
                          >
                            <option>Ether</option>
                            <option>Dai</option>
                          </Form.Control>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formCollateral">
                      <Form.Row>
                        <Form.Label column lg={2}>Collateral: </Form.Label>
                        <Col>
                          <Form.Control
                            name="collateral" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.collateral}
                            as="select"
                          >
                            <option>Ether</option>
                            <option>Dai</option>
                          </Form.Control>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formUse">
                      <Form.Row>
                        <Form.Label column lg={2}>
                          Loan Use
                          <OverlayTrigger placement="right" overlay={useTooltip}>
                            <img className="info" src={info.default} />
                          </OverlayTrigger>
                        </Form.Label>
                        <Col>
                          <Form.Control
                            name="loanUse" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.loanUse}
                            as="select"
                          >
                            <option>Float</option>
                            <option>Variable</option>
                          </Form.Control>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formPercent">
                      <Form.Row>
                        <Form.Label column lg={2}>
                          Collateral Percent
                        </Form.Label>
                        <Col>
                          <Form.Control
                            name="percent" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.percent}
                            type="range"
                          />
                        </Col>
                      </Form.Row>
                    </Form.Group>
                    <Button className="mb-2" variant="secondary" block>
                      Connect Bank
                    </Button>
                    <Button type="submit" className="mb-2" variant="primary" block>
                      Confirm
                    </Button>
                  </Form>
                )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </Modal.Body>
  </Modal>);
};
