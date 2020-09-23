import React, { useContext, useMemo } from "react";

import repeatArrow from "../../../../dist/assets/repeat-arrows.svg";

import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/dashboardContext";

const UniswapPrice = () => {
  const { state } = useContext(AppContext);
  const { tokenData } = state;
  const { values, setSwapExchangeRate, swapExchangeRate } = useContext(
    UniswapContext
  );
  const { first, second } = values;

  const exchangeRate = useMemo(() => {
    const rate =
      tokenData[first.currency].price / tokenData[second.currency].price;
    return swapExchangeRate ? rate : 1 / rate;
  }, [first.currency, second.currency, swapExchangeRate]);

  return (
    <>
      <div className="d-flex justify-content-between mt-2 p-4">
        <div className="text-lightest-gray">Price</div>
        <div className="d-flex flex-row align-items-center">
          <div className="text-lightest-gray mr-1">{`${exchangeRate} ${
            swapExchangeRate ? values.first.currency : values.second.currency
          } per ${
            swapExchangeRate ? values.second.currency : values.first.currency
          }`}</div>
          <img
            src={repeatArrow}
            height={14}
            className="pointer"
            onClick={() => {
              setSwapExchangeRate(!swapExchangeRate);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default UniswapPrice;
