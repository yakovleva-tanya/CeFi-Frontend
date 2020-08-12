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
  const network = state.web3State.network;
  return (
    <div>
      <Router>
        {network&&network.toString() === '3' && (
          <TopWarning
            text={`Note: You are currently connected to Ropsten Testnet`}
          />
         )}
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
