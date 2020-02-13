/**
 * Implements the component interface for the general application.
 *
 * This component uses the composition pattern. It's expected to be the main entrypoint
 * into application pages that connect to the Router.
 * @namespace ViewComponent
 * @category ReactComponents
 */

import * as React from "react";
import Navbar from 'react-bootstrap/Navbar';

interface ViewProps {
  children: React.ReactNode;
}

/**
 * Pure component implementing the ViewComponent
 * @function ViewWrapper
 * @memberof ViewComponent
 */
export const ViewWrapper = (props: ViewProps) => {
  return (
    <div className='view'>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img src="https://pbs.twimg.com/profile_images/1224378875385266176/bKM_ZZKb_400x400.jpg" width="35px;" />&nbsp;&nbsp;Zero Collateral
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <div className='view-content'>
        { props.children }
      </div>
    </div>
  );
}
