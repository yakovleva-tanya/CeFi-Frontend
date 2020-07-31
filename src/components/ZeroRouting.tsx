import * as React from "react";
import { Home } from "./../views/Home";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export function ZeroRouting() {
  return (
    <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}
