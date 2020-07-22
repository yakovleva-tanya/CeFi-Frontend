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
import { Web3Connector } from './LoginWeb3';
import { AppContext, AppContextState } from "./../context/app";

interface Web3LoginButtonProps {
  loggedIn: string | null;
  toggleModal: Function;
}

function truncate(n: number, useWordBoundary: boolean){
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary
       ? subString.substr(0, subString.lastIndexOf(' '))
       : subString) + "...";
}

function Web3Login (props: Web3LoginButtonProps) {
    const { loggedIn, toggleModal } = props;
    return <span>
        { !loggedIn ?
            <Button onClick={() => toggleModal(true)}>
                Connect Web3
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
      <Navbar bg="transparent" expand="lg">
        <Navbar.Brand href="#home">
          Teller
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Item>
            <Button className="bg-transparent red" variant="light">
              Lend
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button className="ml-1 bg-transparent" variant="light">
              Borrow
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link><Web3Login loggedIn={loggedIn} toggleModal={toggleLoginModal} /></Nav.Link>
          </Nav.Item>
        </Navbar.Collapse>
      </Navbar>
      <div className='view-content'>
        { props.children }
      </div>
      <Modal show={showLoginModal} onHide={() => toggleLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login with an Ethereum account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Web3Connector close={toggleLoginModal} />
        </Modal.Body>
      </Modal>
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
