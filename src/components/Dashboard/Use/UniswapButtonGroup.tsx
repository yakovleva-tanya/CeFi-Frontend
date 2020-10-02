import React, { useContext } from "react";

import PrimaryButton from "../../UI/PrimaryButton";

import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/uniswapContext";
import {
  computeTradePriceBreakdown,
  warningSeverity,
} from "../../../actions/Trades";

const UniswapButtonGroup = () => {
  const { setSuccess, trade, values } = useContext(UniswapContext);
  const { state } = useContext(AppContext);
  const { teller } = state;
  const { userWalletBalance } = teller;
  const { input } = values;
  const priceImpact = computeTradePriceBreakdown(trade).priceImpactWithoutFee;
  const impactSeverity = warningSeverity(priceImpact);

  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        {parseInt(values) == 0 ? (
          <PrimaryButton variant="secondary" text="Enter an amount" />
        ) : !trade ? (
          <PrimaryButton variant="secondary" text="Select a token" />
        ) : userWalletBalance[input.token] < parseInt(input.amount) ? (
          <PrimaryButton
            variant="secondary"
            text={`Insufficient ${input.token} balance`}
          />
        ) : impactSeverity > 3 ? (
          <PrimaryButton variant="secondary" text={`Price Impact too high`} />
        ) : (
          <PrimaryButton
            text={`Swap ${impactSeverity > 3 ? "anyway" : ""}`}
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
