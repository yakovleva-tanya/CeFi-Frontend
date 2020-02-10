import * as React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Plaid, { PlaidTransaction } from './../../models/Plaid';
import { AppContext, AppContextState } from "./../../context/app";

function plaidRow(transaction: PlaidTransaction, index: number) {
  return <tr key={index}>
    <td>{index}</td>
    <td>{transaction.date}</td>
    <td>{transaction.name}</td>
    <td>{transaction.amount}</td>
  </tr>
}

export const PlaidConnector = () => {
  const { state, updateAppState } = React.useContext(AppContext);

  const transactions = state.userTransactions;
  const plaidHandler = new Plaid({
    onLoad: (): any => null,
    onSuccess: (public_token: string, metadata: any) => {
      updateAppState((st: AppContextState) => {
        return { ...st, plaidLoggedIn: { publicKey: public_token, metadata} };
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
          <Col>
            <Row>
              <h2>Your Lending Score</h2>
            </Row>
            <Row>
              <h4 className="text-secondary">Unknown</h4>
            </Row>
          </Col>
          <Col>

          </Col>
        </Row>
        <Row>
          <Button onClick={ () => loadPlaid() } variant="outline-primary" block>Connect your Bank Account</Button>
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
                <th>Ammount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(plaidRow)}
            </tbody>
          </Table> : ""
        }
        </Row>
      </Container>
    </div>
  );
};
