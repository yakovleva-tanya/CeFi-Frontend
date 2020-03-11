/**
 * Implements the component interface to login to a web3 provider.
 * @namespace LoginComponent
 * @category ReactComponents
 */

import * as React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { fortmaticOptions } from './../util/constants';
import { AppContext, AppContextState, Web3Type, Web3State } from "./../context/app";
import ethereum from 'ethereum';

const web3FromProvider = {
  'fortmatic': function() {
    const fm = new Fortmatic(fortmaticOptions.apiKey, fortmaticOptions.network);
    const web3 = new Web3(fm.getProvider());
    return { type: Web3Type.Fortmatic, web3 } as Web3State;
  },
  'metamask': async function() {
    const web3 = new Web3(ethereum);
    await ethereum.enable();
    return { type: Web3Type.Metamask, web3 } as Web3State;
  }
};

/**
 * Returns a component used to generate UI for the web3 interface.
 * @function Web3Connector
 * @memberof LoginComponent
 */
export const Web3Connector = () => {
  const { state, updateAppState } = React.useContext(AppContext);

  async function selectProvider(provider) {
    const web3State = await web3FromProvider[provider]();
    updateAppState((st: AppContextState) => ({ ...st, web3State }));
  }

  if (!state.web3State.type) {
    return <div />;
  }
  return (
    <div className="web3-connector">
    </div>
  )
}
