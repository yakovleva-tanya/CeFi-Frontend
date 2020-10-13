import React from "react";
import "./navigation.scss";
import teller_logo from "../../../dist/assets/teller_logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { NavLoginButton } from "./../LoginButton/LoginButton";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import DashboardNav from "../Dashboard/DashboardNav";

type NavProps = {
  to: string;
  name: string;
  className?: string;
};

const NavigationLink = ({ to, name, className = "" }: NavProps) => {
  return (
    <NavLink
      className={`menu-button text-lg text-lightest-gray ${className}`}
      activeClassName="active"
      to={`/${to}`}
    >
      {name}
    </NavLink>
  );
};

const HiddenNavbar = () => {
  return (
    <>
      <Navbar
        bg="transparent"
        collapseOnSelect
        expand="md"
        className="p-4 nav-bar justify-content-between align-items-center container-wrapper"
      >
        <Navbar.Brand>
          <img
            alt=""
            src={teller_logo}
            height="42"
            className="d-inline-block align-top p-1"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end navbar-links"
        >
          <Nav className="align-items-md-center align-items-start border-bottom py-4">
            <NavigationLink to="lend" name="Deposit" />
            <NavigationLink to="borrow" name="Borrow" />
            <NavigationLink
              to="dashboard"
              name="Dashboard"
              className="d-none d-md-inline"
            />
            <NavDropdown
              title="Dashboard"
              id="collasible-nav-dropdown"
              className={`d-md-none menu-button text-lg py-0 border-none text-lightest-gray`}
            >
              <DashboardNav />
            </NavDropdown>
            <NavLoginButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

const ProdNavbar = () => {
  return (
    <Navbar
      bg="transparent"
      expand="lg"
      className="font-medium p-4 nav-bar justify-content-between container-wrapper"
    >
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
      {process.env.NODE_ENV === "development" ? (
        <HiddenNavbar />
      ) : (
        <ProdNavbar />
      )}
    </div>
  );
};

export default Navigation;
