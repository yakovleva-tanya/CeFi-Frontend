import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./navigation.scss";
import teller_logo from "../../../dist/assets/teller_logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { NavLoginButton } from "./../LoginButton/LoginButton";

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
      <Navbar bg="transparent" expand="lg" className="p-4 nav-bar container-wrapper">
        <Navbar.Brand>
          <img
            alt=""
            src={teller_logo}
            height="42"
            className="d-inline-block align-top p-1"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end navbar-links">
          <NavigationLink to="lend" name="Lend" />
          <NavigationLink to="borrow" name="Borrow" />
          <NavigationLink to="dashboard" name="Dashboard" />
          <NavLoginButton />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
