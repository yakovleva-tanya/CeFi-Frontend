/**
 * Implements the component interface to login and view Plaid data.
 * @namespace PlaidComponent
 * @category ReactComponents
 */

import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Plaid, { PlaidTransaction } from './../../models/Plaid';
import PlaidLending from './../PlaidLending';
import { FICOConnector } from './../FICOConnector';
import { AppContext, AppContextState } from "./../../context/app";

function plaidRow(transaction: PlaidTransaction, index: number) {
  return <tr key={index}>
    <td>{index}</td>
    <td>{transaction.date}</td>
    <td>{transaction.name}</td>
    <td>{transaction.amount}</td>
  </tr>
}

function loadFICO(): null {
  return null;
}

/**
 * Returns a compnent used to generate UI for the Plaid interface.
 * @function PlaidConnector
 * @memberof PlaidComponent
 */
export const PlaidConnector = () => {
  const { state, updateAppState } = useContext(AppContext);
  const [showFicoModal, toggleFicoModal] = useState(false);
  const transactions = state.plaid?.userTransactions;
  const address = state.web3State?.address;
  const plaidHandler = new Plaid({
    onLoad: (): any => null,
    onSuccess: async (public_token: string, metadata: any) => {
      await this.storeTokens(address, public_token);
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

  return (
    <div className="plaid-connector">
      <Container className="border rounded p-4">
        <Row>
          <PlaidLending />
          <Col>

          </Col>
        </Row>
        <Row>
          <Button className="mb-2" onClick={ () => loadPlaid() } variant="outline-primary" block>Connect your Bank Account</Button>
        </Row>
        <Row>
          <Button onClick={ () => toggleFicoModal(true) } variant="outline-primary" block>Connect your FICO score</Button>
        </Row>
        <Row>
        {
          transactions ?
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(plaidRow)}
            </tbody>
          </Table> : ""
        }
        </Row>
      </Container>
      <Modal show={showFicoModal} onHide={() => toggleFicoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Connect your FICO Score</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FICOConnector done={() => toggleFicoModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
