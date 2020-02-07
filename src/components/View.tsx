import * as React from "react";
import Navbar from 'react-bootstrap/Navbar';

interface ViewProps {
  children: React.ReactNode;
}

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
