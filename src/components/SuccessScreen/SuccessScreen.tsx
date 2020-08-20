import React from "react";
import "./success-screen.scss";
import PrimaryButton from "../UI/PrimaryButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

type messageProps = {
  url: string;
  version: string;
};

const Message = ({ version, url }: messageProps) => {
  if (version === "lend")
    return (
      <div>
        <div>
          Click{" "}
          <a target="_blank" rel="noreferrer" href={url}>
            here
          </a>{" "}
          to view your supply balance.{" "}
        </div>
      </div>
    );
  if (version === "borrow")
    return (
      <div>
        <div>
          Click{" "}
          <a target="_blank" rel="noreferrer" href={url}>
            here.
          </a>{" "}
          to view your borrow balance status. Get started using your loan by
          exploring our dashboard.
        </div>
        <div>Find out what you can do with your loan </div>
      </div>
    );
};

type successProps = {
  link: string;
  version: string;
  onButtonClick?: Function;
};

const SuccessScreen = ({ link, version, onButtonClick }: successProps) => {
  return (
    <div className="success-screen d-flex align-items-center justify-content-center flex-column">
      <div className="text-5xl">
        <span>🎉</span>
      </div>
      <div className="text-5xl">You're set!</div>
      <div className="text-gray m-3">
        <Message url={link} version={version} />
      </div>
      <Link to="/">
        <PrimaryButton onClick={onButtonClick} text="Lend Again" />
      </Link>
    </div>
  );
};

export default SuccessScreen;
