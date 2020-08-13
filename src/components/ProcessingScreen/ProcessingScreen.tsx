import React from "react";
import "./processing-screen.scss";
import ProcessingAnimation from "../UI/ProcessingAnimation";

type props = {
  link: string;
};

const ProcessingScreen = ({ link }: props) => {
  const url = "https://ropsten.etherscan.io/tx/" + link; //link to ropsten
  // const url = "https://etherscan.io/tx/" + link; //link to etherscan
  return (
    <div className="processing-screen d-flex align-items-center justify-content-center flex-column">
      <div className="text-5xl">
        <ProcessingAnimation />
      </div>
      <div className="text-5xl processing-text">Processing</div>
      <div className="text-gray m-3">
        Your transaction is currently being verified onchain -{" "}
        <a className="text-gray" href={url} target="_blank" rel="noreferrer">
          <u>check its status</u>
        </a>
        .
      </div>
    </div>
  );
};

export default ProcessingScreen;
