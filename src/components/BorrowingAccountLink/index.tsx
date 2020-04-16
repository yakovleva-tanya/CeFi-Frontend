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
import * as plaid from './../../../dist/assets/plaid.svg';
import * as fico from './../../../dist/assets/fico-logo-blue-large.png';

import './index.scss';

export default () => {
  const [showModal, toggleModal] = useState(false);
  const { state, updateAppState } = useContext(AppContext);
  const address = state.web3State?.address;

  const plaidLoggedIn = state.plaid.loggedIn;

  const renderAccountHelpTooltip = (props: any) => (
    <Tooltip id="account-help-tooltip" {...props}>
      Add your account to receive a better interest rate and collateral percent.
    </Tooltip>
  );

  const plaidHandler = new Plaid({
    onLoad: (): any => null,
    onSuccess: function (public_token: string, metadata: any) {
      updateAppState(async (st: AppContextState) => {
        try {
          await Plaid.storeWallet(address);
          await Plaid.storeTokens(address, public_token);
          const plaid = st.plaid;
          plaid.loggedIn = { publicKey: public_token, metadata };
          return { ...st, plaid  };
        } catch (e) {
          const errorModal = {
            show: true,
            message: "An error occurred connecting your account. Please try again.",
            title: "Error"
          };
          return { ...st, errorModal };
        }

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
    <Modal show={showModal} onHide={() => toggleModal(false)} size={'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>Connect a new Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col md={6} sm={12}>
              <Card className="p-2 m-2" style={{ width: '100%' }}>
                <Card.Img variant="top" src={plaid.default} style={{ height: '5rem' }} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    Connect your bank account with Plaid.
                  </Card.Text>
                  <Button className="mb-2" onClick={ () => loadPlaid() } variant="outline-primary" block>
                    Connect
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} sm={12}>
              <Card className="p-2 m-2" style={{ width: '100%' }}>
                <Card.Img variant="top" src={fico.default} style={{ height: '5rem', width: '14rem', marginLeft: '4rem' }} />
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                    Connect your FICO score. (Coming soon!)
                  </Card.Text>
                  <Button className="mb-2" disabled variant="outline-secondary" block>
                    Connect
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  </Card>;
}
