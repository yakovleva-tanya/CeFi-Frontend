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

const HiddenNavbar = () => {
  return (
    <Navbar bg="transparent" expand="lg" className="p-4 nav-bar justify-content-between container-wrapper">
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
  );
};

const ProdNavbar = () => {
  return (
    <Navbar bg="transparent" expand="lg" className="p-4 nav-bar justify-content-between container-wrapper">
      <Navbar.Brand>
        <img
          alt=""
          src={teller_logo}
          height="42"
          className="d-inline-block align-top p-1 mb-4"
        />
      </Navbar.Brand>
      <div className="mb-4">
        <NavLoginButton />
      </div>
    </Navbar>
  );
};

const Navigation = () => {
  return (
    <div>
      { process.env.NODE_ENV === "development"? <HiddenNavbar /> : <ProdNavbar /> }
    </div>
  );
};

export default Navigation;
