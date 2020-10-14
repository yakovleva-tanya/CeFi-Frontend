import React, { useContext, useMemo } from "react";

import PrimaryButton from "../../UI/PrimaryButton";

import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/uniswapContext";
import {
  computeTradePriceBreakdown,
  warningSeverity,
} from "../../../actions/Trades";
import swap from "../../../actions/Swap";

const UniswapButtonGroup = () => {
  const { setSuccess, trade, values } = useContext(UniswapContext);
  const { state } = useContext(AppContext);
  const { teller } = state;
  const { escrowContract, web3UniswapContract } = state.teller.contracts.ETH.tDAI;
  const { userWalletBalance } = teller;
  const { input } = values;
  const priceImpact = useMemo(() => {
    return computeTradePriceBreakdown(trade).priceImpactWithoutFee;
  }, [trade]);
  const impactSeverity = useMemo(() => {
    return warningSeverity(priceImpact);
  }, [priceImpact]);

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
              swap(escrowContract, web3UniswapContract, trade);
              setSuccess(true);
            }}
          />
        )}
      </div>
    </>
  );
};

export default UniswapButtonGroup;
