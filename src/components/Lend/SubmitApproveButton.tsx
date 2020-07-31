import React from 'react';
import { Check } from "react-bootstrap-icons";

type SubmitApproveType = {
  loggedIn: string,
  tokensSubmitted: boolean,
  setTokensSubmitted: Function
};

const SubmitApproveButton = ({ loggedIn, tokensSubmitted, setTokensSubmitted }: SubmitApproveType) => {
  return (
    <div className="d-flex flex-row align-items-center">
      <div
        className={`py-1 px-3 border-thin  ${
          loggedIn ? "pointer" : "disabled"
          }`}
        onClick={() => {
          if (loggedIn) {
            setTokensSubmitted(true);
          }
        }}
      >
        Submit
      </div>
      <Check
        className={`${
          tokensSubmitted ? `text-green` : `text-lightest-gray`
          } text-lg ml-2`}
        size={24}
      />
    </div>
  );
};

export default SubmitApproveButton;
