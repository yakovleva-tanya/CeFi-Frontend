import React, { useContext, useMemo, useState } from "react";

import repeatArrow from "../../../../dist/assets/repeat-arrows.svg";
import { UniswapContext } from "../../../context/uniswapContext";
import { formatExecutionPrice } from "../../../actions/Trades";

const UniswapPrice = () => {
  const { trade } = useContext(UniswapContext);
  const [isInverted, setIsInverted] = useState(false);
  const getExecutionPrice = () => formatExecutionPrice(trade, isInverted);
  const executionPrice = useMemo(() => {
    return getExecutionPrice();
  }, [trade, isInverted]);
  return (
    <>
      <div className="d-flex justify-content-between mt-2 p-4">
        <div className="text-lightest-gray">Price</div>
        <div className="d-flex flex-row align-items-center">
          <div className="text-lightest-gray mr-1">{executionPrice}</div>
          <img
            src={repeatArrow}
            height={14}
            className="pointer"
            onClick={() => {
              setIsInverted(!isInverted);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default UniswapPrice;
