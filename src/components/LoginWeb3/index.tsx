/**
 * Implements the component interface to login to a web3 provider.
 * @namespace LoginComponent
 * @category ReactComponents
 */

import * as React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Web3 from 'web3';
import Onboard from 'bnc-onboard';
import { BlockNativeOptions } from './../../util/constants';

import { AppContext, AppContextState, Web3Type, Web3State } from "./../../context/app";

import * as eth from './../../../dist/assets/eth-diamond.color.png';

export async function web3FromProvider(x: Web3Type, close: Function, updateAppState: Function) {
  close(false);
  const onboard = Onboard({
    ...BlockNativeOptions,
    subscriptions: {
      wallet: async (wallet: any) => {
        const web3 = new Web3(wallet.provider);
        const accounts = await web3.eth.getAccounts();
        const web3State = { type: Web3Type.BlockNative, address: accounts[0], web3 } as Web3State;
        updateAppState((st: AppContextState) => {
          return { ...st, web3State }
        });
      }
    }
  });
  await onboard.walletSelect();
  await onboard.walletCheck();
}

interface LoggedOutProps {
  selectProvider: Function;
  close: Function;
}

function LoggedOut({ selectProvider, close }: LoggedOutProps) {
  return <Container fluid>
    <Row>
      <Col md={6} sm={12}>
        <Card className="p-2 m-2" style={{ width: '100%' }}>
          <Card.Img variant="top" src={eth.default} style={{ height: '5rem',  width: '3.5rem', marginLeft: '4rem' }} />
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              Connect with your Web3 provider.
            </Card.Text>
            <Button className="mb-2" onClick={ () => selectProvider(Web3Type.BlockNative, close) } variant="outline-primary" block>
              Connect
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>;
}

function LoggedIn() {
  return <div></div>
}

interface Web3Props {
  close: Function;
}

/**
 * Returns a component used to generate UI for the web3 interface.
 * @function Web3Connector
 * @memberof LoginComponent
 */
export const Web3Connector = ({ close }: Web3Props) => {
  const { state, updateAppState } = React.useContext(AppContext);

  async function selectProvider(provider: Web3Type, close: Function) {
    web3FromProvider(provider, close, updateAppState);
  }

  const loggedIn = state.web3State.type;
  const address = state.web3State.address;

  return (
    <div className="login-web3">
      { loggedIn ? <LoggedIn /> : <LoggedOut close={close} selectProvider={selectProvider} /> }
    </div>
  )
}
