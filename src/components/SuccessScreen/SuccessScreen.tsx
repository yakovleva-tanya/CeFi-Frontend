import React from "react";
import "./success-screen.scss";
import PrimaryButton from "../UI/PrimaryButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoadingAnimation from "../UI/LoadingAnimation";

type successProps = {
  title: string;
  message: React.ReactNode;
  onButtonClick?: Function;
  fullScreen?: boolean;
  CTA?: string;
};

const SuccessScreen = ({
  title,
  message,
  onButtonClick,
  fullScreen = true,
  CTA = "Go to dashboard",
}: successProps) => {
  return (
    <div className={`${fullScreen ? "cards-container success-screen" : ""} `}>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="text-5xl m-4">
          <LoadingAnimation isStopped={false} animation="success" />
        </div>
        <div className="text-5xl font-medium">{title}</div>
        <div className="text-gray m-3">{message}</div>
        <Link to="/dashboard">
          <PrimaryButton onClick={onButtonClick} text={CTA} />
        </Link>
      </div>
    </div>
  );
};

export default SuccessScreen;
