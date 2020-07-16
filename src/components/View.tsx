/**
 * Implements the component interface for the general application.
 *
 * This component uses the composition pattern. It's expected to be the main entrypoint
 * into application pages that connect to the Router.
 * @namespace ViewComponent
 * @category ReactComponents
 */

import React, { useState, useContext } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import { web3FromProvider } from './LoginWeb3';
import { AppContext, AppContextState, Web3Type } from "./../context/app";


function truncate(n: number, useWordBoundary: boolean){
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary
       ? subString.substr(0, subString.lastIndexOf(' '))
       : subString) + "...";
}

interface Web3LoginButtonProps {
  loggedIn: string | null;
  updateAppState: Function;
}

function Web3Login (props: Web3LoginButtonProps) {
    const { loggedIn, updateAppState } = props;
    const noop = () => 1;
    return <span>
        { !loggedIn ?
            <Button className="mb-2"
              onClick={ () => web3FromProvider(Web3Type.BlockNative, noop, updateAppState) }
              variant="outline-primary" block
            >
              Connect
            </Button> :
            <Badge variant="primary" className="p-2 font-weight-bold">{ truncate.apply(loggedIn, [10]) } </Badge>
        }
    </span>;
}

interface ViewProps {
  children: React.ReactNode;
}

/**
 * Pure component implementing the ViewComponent
 * @function ViewWrapper
 * @memberof ViewComponent
 */
export const ViewWrapper = (props: ViewProps) => {
  const [showLoginModal, toggleLoginModal] = useState(false);

  const { state, updateAppState } = useContext(AppContext);
  const loggedIn = state.web3State?.address || "";
  const errors = state.errorModal;

  const toggleErrorModal = (show: boolean) => updateAppState((st: AppContextState) => ({ ...st, errorModal: { show } }));

  return (
    <div className='view'>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img src="https://pbs.twimg.com/profile_images/1224378875385266176/bKM_ZZKb_400x400.jpg" width="35px;" />&nbsp;&nbsp;Zero Collateral
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Item>
            <Nav.Link><Web3Login loggedIn={loggedIn} updateAppState={updateAppState} /></Nav.Link>
          </Nav.Item>
        </Navbar.Collapse>
      </Navbar>
      <div className='view-content'>
        { props.children }
      </div>
      <Modal centered={true} show={errors.show} onHide={() => toggleErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{errors.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { errors.message }
        </Modal.Body>
      </Modal>
    </div>
  );
}
