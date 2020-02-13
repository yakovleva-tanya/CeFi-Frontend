import * as React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AppContext } from "./../context/app";

function PlaidNotAvailable() {
  return <div className='plaid-lending-not-available'>
    <Col>
      <Row>
        <h2>Your Available Lending: Unknown</h2>
      </Row>
      <Row>
        <p className="text-secondary">To unlock lending, please login with plaid.</p>
      </Row>
    </Col>
  </div>
}

export default function PlaidLending () {

  const { state } = React.useContext(AppContext);

  if (!state.plaid?.income) {
    return <PlaidNotAvailable />;
  }

  const income = state.plaid?.income;

  return <div className='plaid-lending'>
    <Col>
      <Row>
        <h2>Your Available Lending: ${income} USD</h2>
      </Row>
      <Row>
        <p className="text-secondary">You can borrow up to ${income} USD in token value.</p>
      </Row>
    </Col>
  </div>
}
