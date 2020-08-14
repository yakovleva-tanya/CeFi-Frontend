import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./navigation.scss";
import teller_logo from "../../../dist/assets/teller_logo.svg";
import { NavLoginButton } from "./../LoginButton/LoginButton";

const Navigation = () => {
  return (
    <Container>
      <Navbar
        bg="transparent"
        expand="lg"
        className="navBar justify-content-between px-0 m-2"
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
    </Container>
  );
};

export default Navigation;
