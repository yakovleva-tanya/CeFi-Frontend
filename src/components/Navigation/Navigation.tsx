import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./navigation.scss";
import teller_logo from "../../../dist/assets/teller_logo.svg";
import { NavLoginButton } from "./../LoginButton/LoginButton";

const Navigation = () => {
  return (
    <div>
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
    </div>
  );
};

export default Navigation;
