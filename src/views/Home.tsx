import * as React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { AppContext } from "./../context/app";

export function Home() {
  const { state, updateAppState } = React.useContext(AppContext);
  return (<Container>
    <Row>
      <h1> {state.loggedIn ? "Ok" : "No"}</h1>
    </Row>
  </Container>);
}
