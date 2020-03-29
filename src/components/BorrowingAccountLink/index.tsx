import React, { useState, useContext } from "react";
import { AppContext, AppContextState } from "./../../context/app";
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Plaid from './../../models/Plaid';

import * as boa from './../../../dist/assets/boa-icon.jpg';

import './index.scss';

function renderAccountHelpTooltip(props: any) {
  return (
    <Tooltip id="account-help-tooltip" {...props}>
      Add your account to receive a better interest rate and collateral percent.
    </Tooltip>
  );
}

export default () => {
  const [showModal, toggleModal] = useState(false);
  const { state, updateAppState } = useContext(AppContext);

  const plaidLoggedIn = state.plaid.loggedIn;

  const plaidHandler = new Plaid({
    onLoad: (): any => null,
    onSuccess: (public_token: string, metadata: any) => {
      updateAppState((st: AppContextState) => {
        const plaid = st.plaid;
        plaid.loggedIn = { publicKey: public_token, metadata };
        return { ...st, plaid  };
      });
      toggleModal(false);
    },
    onExit: (): any => null,
    onEvent: (): any => null
  });

  const loadPlaid = () => {
    plaidHandler.load();
  };

  return <Card className="borrowing-account-link mt-5 px-5 w-100">
    <Card.Body>
      <Container fluid>
        <Row>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderAccountHelpTooltip}
          >
            <Button variant="outline-primary" onClick={ () => toggleModal(true) } block>Add Bank Account</Button>
          </OverlayTrigger>
        </Row>
        { plaidLoggedIn ?
          (<Card className="bank-loggedin-card">
            <Card.Img variant="top" src={boa.default} alt="Bank Of America Icon" />
          </Card>) : ""
        }
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
