import React from "react";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export interface IConfirm {
  open: boolean;
  run: Function;
}

interface BorrowTOSModalProps {
  showModal: IConfirm;
  toggleModal: Function;
}

export const defaultIConfirm: IConfirm = { open: false, run: () => 1 };

export const BorrowTOSModal = ({ showModal, toggleModal }: BorrowTOSModalProps) => {

  function reject () {
    return (showModal.run) && showModal.run(Promise.reject()) && toggleModal(defaultIConfirm);
  }
  function confirm () {
    return (showModal.run) && showModal.run(Promise.resolve()) && toggleModal(defaultIConfirm);
  }
  return (<Modal show={showModal.open} onHide={reject} size={'lg'}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Borrowing Terms</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container className='borrow-tos-modal'>
        <Card className="p-2 m-2" style={{ width: '100%' }}>
          <Card.Body>
            <Card.Text>
              <div className='text-center pb-2'>
                <h3>Your Borrowing Terms</h3>
              </div>
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
                    <td><p className="float-right">{"24%"}</p></td>
                  </tr>
                </tbody>
              </Table>
              
            </Card.Text>
            <Button className="mb-2" variant="primary" block onClick={confirm}>
              Confirm
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Modal.Body>
  </Modal>);
};
