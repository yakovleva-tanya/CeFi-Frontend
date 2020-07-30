import React from "react";
import './success-screen.scss';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

type Props = {
  link: string;
};

const SuccessScreen = ({ link }: Props) => {
  return (
    <div className="success-screen d-flex align-items-center justify-content-center flex-column">
      <div className="text-5xl"><span>🎉</span></div>
      <div className = "text-5xl">Hooray!!</div>
      <div className="text-gray m-3">
        <div>You've supplied your loan. You can check <a href={link}>here</a></div>
        <div>Find out what you can do with your TToken </div>
      </div>
      <Link
        to='/dashboard'
      >
        <Button className='py-3 px-4 mt-2 text-lg' variant="primary" block>Explore Dashboard</Button>
      </Link>
    </div>
  );
};

export default SuccessScreen;
