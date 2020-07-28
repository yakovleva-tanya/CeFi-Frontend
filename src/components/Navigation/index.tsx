import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./index.scss";
import teller_logo from "../../../assets/teller_logo.svg"
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Web3Connector } from './../LoginWeb3';
import { AppContext, AppContextState } from "./../../context/app";

interface Web3LoginButtonProps {
  loggedIn: string | null;
  toggleModal: Function;
}
function Web3Login(props: Web3LoginButtonProps) {
  const { loggedIn, toggleModal } = props;
  return (
    <span>
      {!loggedIn ? (
        <a
          className="menu-button login-button"
          onClick={() => toggleModal(true)}
        >
          Connect Wallet
        </a>
      ) : (
          <div
            className="menu-button login-button"
          >
            {truncate.apply(loggedIn, [10])}
          </div>
        )}
    </span>
  );
}

function truncate(n: number, useWordBoundary: boolean) {
  if (this.length <= n) {
    return this;
  }
  const subString = this.substr(0, n - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
}

const Navigation = () => {
  const { state, updateAppState } = useContext(AppContext);
  const loggedIn = state.web3State?.address || "";
  const errors = state.errorModal;
  const [showLoginModal, toggleLoginModal] = useState(false);
  const toggleErrorModal = (show: boolean) => updateAppState((st: AppContextState) => ({ ...st, errorModal: { show } }));

  return (
    <div>
      <Navbar bg="transparent" expand="lg" className="navBar">
        <Navbar.Brand>
          <img
            alt=""
            src={teller_logo}
            height="41"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <NavigationLink to="lend" name="Lend" />
          <NavigationLink to="borrow" name="Borrow" />
          <NavigationLink to="dashboard" name="Dashboard" />
          <Web3Login loggedIn={loggedIn} toggleModal={toggleLoginModal} />
        </Navbar.Collapse>
      </Navbar>
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
          {errors.message}
        </Modal.Body>
      </Modal>
    </div>
  );
};

type NavProps = {
  to: string;
  name: string;
};
const NavigationLink = ({ to, name }: NavProps) => {
  return (
    <NavLink
      activeClassName="selected"
      className="menu-button"
      to={`/${to}`}
    >
      {name}
    </NavLink>
  );
};

export default Navigation;
