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
          to view your supply balance. Get started by exploring our dashboard.
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
          to view your borrow balance status.
        </div>
        <div>Get started using your loan by exploring our dashboard.</div>
      </div>
    );
  if (version === "claim")
    return (
      <div>
        <div>
          View your{" "}
          <a target="_blank" rel="noreferrer" href={url}>
            claim transaction.
          </a>
        </div>
      </div>
    );
  if (version === "withdraw")
    return (
      <div>
        <div>
          View your{" "}
          <a target="_blank" rel="noreferrer" href={url}>
            withdraw transaction.
          </a>
        </div>
      </div>
    );
};

type successProps = {
  link: string;
  version: string;
  onButtonClick?: Function;
  fullScreen?: boolean;
};

const SuccessScreen = ({
  link,
  version,
  onButtonClick,
  fullScreen = true,
}: successProps) => {
  return (
    <div className={`${fullScreen ? "cards-container success-screen" : ""} `}>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="text-5xl">
          <span>🎉</span>
        </div>
        <div className="text-5xl">
          {version == "claim" && "Interest Collected!"}
          {version == "withdraw" && "Withdraw Completed!"}
          {(version == "lend" || version == "borrow") && "You're set!"}
        </div>
        <div className="text-gray m-3">
          <Message url={link} version={version} />
        </div>
        <Link to="/dashboard">
          <PrimaryButton onClick={onButtonClick} text={"Explore Dashboard"} />
        </Link>
      </div>
    </div>
  );
};

export default SuccessScreen;
