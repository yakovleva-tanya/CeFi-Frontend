import React, { useContext } from "react";

import PrimaryButton from "../../UI/PrimaryButton";

import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/dashboardContext";

const UniswapButtonGroup = () => {
  const { setSuccess, values } = useContext(UniswapContext);
  const { state } = useContext(AppContext);
  const { teller } = state;
  const { userWalletBalance } = teller;

  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        {parseInt(values.first.amount) == 0 ? (
          <PrimaryButton variant="secondary" text="Enter an amount" />
        ) : !values.second ? (
          <PrimaryButton variant="secondary" text="Select a token" />
        ) : userWalletBalance[values.first.currency] <
          parseInt(values.first.amount) ? (
          <PrimaryButton
            variant="secondary"
            text={`Insufficient ${values.first.currency} balance`}
          />
        ) : (
          <PrimaryButton
            text="Swap"
            onClick={() => {
              setSuccess(true);
            }}
          />
        )}
      </div>
    </>
  );
};

export default UniswapButtonGroup;
