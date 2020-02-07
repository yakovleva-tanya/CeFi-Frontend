import * as React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { ViewWrapper } from "./../../components/View";
import { PlaidConnector } from "./../../components/Plaid";

import './index.scss';

const AlphaWarning = (props: { setAlphaShow: Function }) => {
  return <div className='alpha-warning'>
    <Alert variant="danger" onClose={() => props.setAlphaShow(false)} dismissible>
      <Alert.Heading className="text-center">This project is in Alpha!</Alert.Heading>
      <p>
        This project is currently in testing phase. Please use at your own risk. Your funds may be lost.
      </p>
    </Alert>
  </div>;
}

export const Home = () => {
  const [showAlphaAlert, setAlphaShow] = React.useState(true);
  return (<div className='home-view'>
    <ViewWrapper>
      <div className="callout-main mt-5">
        <Container>
          <Row className="justify-content-md-center">
            <h1 className="text-center">Borrow and Lend on Ethereum. As Little as Zero Collateral.</h1>
          </Row>
          <Row className="justify-content-md-center">
            <h3 className="text-center text-secondary">With each paidback borrow, collateral needed decreases.</h3>
          </Row>
          <Row className="justify-content-md-center">
            { showAlphaAlert ? <AlphaWarning setAlphaShow={setAlphaShow} /> : ''}
          </Row>
        </Container>
        <PlaidConnector />
      </div>
    </ViewWrapper>
  </div>);
}
