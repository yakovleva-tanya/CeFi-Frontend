import React, { useState, useContext } from "react";
import { AppContext, AppContextState } from "./../context/app";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Plaid from './../models/Plaid';

export default () => {
  const [showModal, toggleModal] = useState(false);
  const { state, updateAppState } = useContext(AppContext);

  const plaidHandler = new Plaid({
    onLoad: (): any => null,
    onSuccess: (public_token: string, metadata: any) => {
      updateAppState((st: AppContextState) => {
        const plaid = st.plaid;
        plaid.loggedIn = { publicKey: public_token, metadata };
        return { ...st, plaid  };
      });
    },
    onExit: (): any => null,
    onEvent: (): any => null
  });

  const loadPlaid = () => {
    plaidHandler.load();
  };

  return <Card className="mt-5 px-5 w-100">
    <Card.Body>
      <Container fluid>
        <Row>
          <Col xs={10}>
            <h6 className="d-inline-block">Accounts</h6>
            <h6 className="d-inline-block float-right">06/01/2020</h6>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <h6 className="d-inline-block">Accounts</h6>
          </Col>
          <Col xs={2}>
            <Button variant="success" onClick={ () => toggleModal(true) }>Add Account</Button>
          </Col>
        </Row>
      </Container>
    </Card.Body>
    <Modal show={showModal} onHide={() => toggleModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Connect a new Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button className="mb-2" onClick={ () => loadPlaid() } variant="outline-primary" block>Plaid</Button>
      </Modal.Body>
    </Modal>
  </Card>;
}