import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Lend from "./../components/Lend/Lend";
import Borrow from "./../components/Borrow/Borrow";
import Dashboard from "./../components/Dashboard/Dashboard";
import Navigation from "./Navigation/Navigation";
import { AppContext, AppContextState } from "../context/app";
import TopWarning from "./UI/TopWarning";

export default function Routing() {
  const { state, updateAppState } = useContext(AppContext);
  const errors = state.errorModal;
  const toggleErrorModal = (show: boolean) =>
    updateAppState((st: AppContextState) => ({ ...st, errorModal: { show } }));

  return (
    <div>
      <Router>
        <NetworkBar />
        <Navigation />
        <Switch>
          <Route path="/lend">
            <Lend />
          </Route>
          <Route path="/borrow">
            <Borrow />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Lend />
          </Route>
        </Switch>
      </Router>
      <Modal
        centered={true}
        show={errors.show}
        onHide={() => toggleErrorModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{errors.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errors.message}</Modal.Body>
      </Modal>
    </div>
  );
}

const NetworkBar = () => {
  const { state } = useContext(AppContext);
  const network = state.web3State.network;

  interface networkNamesType {
    [key: string]: string;
  }
  const network_names: networkNamesType = {
    42: "Note: Kovan Testnet is not supported",
    3: "Note: You are currently connected to Ropsten Testnet",
    4: "Note: You are currently connected to Rinkeby Testnet",
    5: "Note: Goerli Testnet is not supported",
  };
  return (
    <div>
      {network && network.toString() !== "1" && (
        <TopWarning
          text={
            network_names[network] ||
            "Note: You are currently on an unsupported network"
          }
        />
      )}
    </div>
  );
};
