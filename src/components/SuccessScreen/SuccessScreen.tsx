import React from "react";
import "./success-screen.scss";
import PrimaryButton from "../UI/PrimaryButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

type messageProps = {
  url: string;
  type: string;
};

const Message = ({ type, url }: messageProps) => {
  if (type === "lend")
    return (
      <div>
        <div>
          You've supplied your loan. You can check{" "}
          <a target="_blank" rel="noreferrer" href={url}>
            here
          </a>
        </div>
        <div>Find out what you can do with your TToken </div>
      </div>
    );
  if (type === "borrow")
    return (
      <div>
        <div>
          You'll be receiving your loan shortly. You can check the status{" "}
          <a target="_blank" rel="noreferrer" href={url}>
            here.
          </a>
        </div>
        <div>Find out what you can do with your loan </div>
      </div>
    );
};

type successProps = {
  link: string;
  type: string;
};

const SuccessScreen = ({ link, type }: successProps) => {
  const url = "https://ropsten.etherscan.io/tx/" + link; //link to ropsten
  // const url = "https://etherscan.io/tx/" + link; //link to etherscan

  return (
    <div className="success-screen d-flex align-items-center justify-content-center flex-column">
      <div className="text-5xl">
        <span>🎉</span>
      </div>
      <div className="text-5xl">Hooray!!</div>
      <div className="text-gray m-3">
        <Message url={url} type={type} />
      </div>
      <Link to="/dashboard">
        <PrimaryButton text="Explore Dashboard" />
      </Link>
    </div>
  );
};

export default SuccessScreen;
