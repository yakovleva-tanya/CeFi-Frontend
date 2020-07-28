import  React from "react";
import { Home } from "./../views/Home";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { LendingSection } from "./../components/LendingSection";
import { BorrowingSection } from "./../components/BorrowingSection";
import Navigation from './../components/Navigation';

export default function Routing() {

  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route path="/lend">
          <Lend/>
        </Route>
        <Route path="/borrow">
          <Borrow />
        </Route>
        <Route path="/dashboard">
          <Dashboard/>>
        </Route>
        <Route path="/">
          <Lend />
        </Route>
      </Switch>
    </Router>
  );
}

const Lend = () => {
  return(
    <div> Lend </div>
  )
}

const Borrow = () => {
  return (
    <div> Borrow </div>
  )
}

const Dashboard = () => {
  return (
    <div> Dashboard </div>
  )
}
