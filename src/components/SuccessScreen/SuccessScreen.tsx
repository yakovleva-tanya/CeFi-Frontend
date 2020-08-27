import React from "react";
import "./success-screen.scss";
import PrimaryButton from "../UI/PrimaryButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

type successProps = {
  title: string;
  message: React.ReactNode;
  onButtonClick?: Function;
  fullScreen?: boolean;
};

const SuccessScreen = ({
  title,
  message,
  onButtonClick,
  fullScreen = true,
}: successProps) => {
  return (
    <div className={`${fullScreen ? "cards-container success-screen" : ""} `}>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="text-5xl">
          <span>🎉</span>
        </div>
        <div className="text-5xl font-medium">{title}</div>
        <div className="text-gray m-3">{message}</div>
        <Link to="/dashboard">
          <PrimaryButton onClick={onButtonClick} text={"Explore Dashboard"} />
        </Link>
      </div>
    </div>
  );
};

export default SuccessScreen;
