import React from "react";
import "./processing-screen.scss";
import ProcessingAnimation from "../UI/ProcessingAnimation";

type props = {
  link: string;
  version:string
};

const ProcessingScreen = ({ link, version }: props) => {
  return (
    <div className="processing-screen d-flex align-items-center justify-content-center flex-column">
      <div className="text-5xl">
        <ProcessingAnimation />
      </div>
      <div className="text-5xl processing-text">
        {version === "loan" && "Almost there"}
        {version === "borrow-submitting" && "Submitting loan terms"}
        {version === "borrow-requesting" && "Requesting Loan"}
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
