import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./navigation.scss";
import teller_logo from "../../../assets/teller_logo.svg"
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import LoginButton from './../LoginButton/LoginButton';

type NavProps = {
  to: string;
  name: string;
};

const NavigationLink = ({ to, name }: NavProps) => {
  return (
    <NavLink
      className="menu-button text-lg text-lightest-gray"
      activeClassName="active"
      to={`/${to}`}
    >
      {name}
    </NavLink>
  );
};

const Navigation = () => {
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
          <LoginButton/>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
