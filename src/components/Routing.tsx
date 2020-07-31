import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Lend from './../components/Lend/Lend';
import Borrow from './../components/Borrow/Borrow';
import Dashboard from './../components/Dashboard/Dashboard';
import LoginModals from './../components/LoginModals/LoginModals'
import Navigation from './Navigation/Navigation';

export default function Routing() {
  return (
    <div className="mx-2">
      <Router >
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
        <LoginModals />
      </Router>
    </div>
  );
}

