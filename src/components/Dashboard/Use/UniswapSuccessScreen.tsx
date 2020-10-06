import React, { useContext } from "react";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";

import { UniswapContext } from "../../../context/uniswapContext";

const UniswapSuccessScreen = () => {
  const { setSuccess } = useContext(UniswapContext);

  return (
    <SuccessScreen
      title="Transaction Submitted"
      onButtonClick={() => {
        setSuccess(false);
      }}
      message={
        <div>
          View transaction status{" "}
          <a
            className="link text-gray"
            target="_blank"
            rel="noreferrer"
            href="https://etherscan.io/tx/"
          >
            <u>here</u>.
          </a>
        </div>
      }
      CTA="Go back"
    />
  );
};

export default UniswapSuccessScreen;
