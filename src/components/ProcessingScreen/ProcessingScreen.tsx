import React from "react";
import "./processing-screen.scss";
import ProcessingAnimation from "../UI/ProcessingAnimation";

type props = {
  link: string;
  title: string;
  fullScreen?: boolean;
};

const ProcessingScreen = ({ link, title, fullScreen = true }: props) => {
  return (
    <div
      className={`${
        fullScreen ? "processing-screen" : "-my-2"
      }  d-flex align-items-center justify-content-center flex-column`}
    >
      <div className={`text-5xl ${fullScreen ? "" : "-my-2"}`}>
        <ProcessingAnimation />
      </div>
      <div className="text-5xl processing-text">
        {title}
      </div>
      <div className="text-gray m-3">
        Your transaction is being verified -{" "}
        <a className="text-gray" href={link} target="_blank" rel="noreferrer">
          <u>view status</u>
        </a>
        .
      </div>
    </div>
  );
};

export default ProcessingScreen;
