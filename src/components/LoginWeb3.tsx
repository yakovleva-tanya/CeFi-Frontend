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
import Web3 from 'web3';

import { fortmaticOptions } from './../util/constants';
import { AppContext, AppContextState, Web3Type, Web3State } from "./../context/app";

declare const window: any;
const Fortmatic = window.Fortmatic;
const ethereum = window.ethereum;

async function web3FromProvider(x: Web3Type, close: Function) {
  if (x == Web3Type.Fortmatic) {
    const fm = new Fortmatic(fortmaticOptions.apiKey, fortmaticOptions.network);
    const web3 = new Web3(fm.getProvider());
    const accounts = await web3.eth.getAccounts();
    close(false);
    return { type: Web3Type.Fortmatic, address: accounts[0], web3 } as Web3State;
  }

  if (x === Web3Type.Metamask) {
    const web3 = new Web3(ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    close(false);
    return { type: Web3Type.Metamask, address: accounts[0], web3 } as Web3State;
  }
}

interface LoggedOutProps {
  selectProvider: Function;
  close: Function;
}

function LoggedOut({ selectProvider, close }: LoggedOutProps) {
  return <Card>
    <Card.Body>
      <Card.Title>Choose a login option below:</Card.Title>
      <Button onClick={() => selectProvider(Web3Type.Fortmatic, close)} block>
        <Container>
          <Row>
            <h3 className="text-dark">Fortmatic</h3>
          </Row>
          <Row>
            <p className="text-left">Login with Phone Number or Email. No downloads required.</p>
          </Row>
        </Container>
      </Button>
      <Button onClick={() => selectProvider(Web3Type.Metamask, close)} block>
        <Container>
          <Row>
            <h3 className="text-dark">Metamask</h3>
          </Row>
          <Row>
            <p className="text-left">Login with Metamask or installed Web3 provider.</p>
          </Row>
        </Container>
      </Button>
    </Card.Body>
  </Card>;
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
    const web3State = await web3FromProvider(provider, close);
    updateAppState((st: AppContextState) => ({ ...st, web3State }));
  }

  const loggedIn = state.web3State.type;
  const address = state.web3State.address;

  return (
    <div className="login-web3">
      { loggedIn ? <LoggedIn /> : <LoggedOut close={close} selectProvider={selectProvider} /> }
    </div>
  )
}
