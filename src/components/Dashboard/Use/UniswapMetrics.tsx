import React, { useContext } from "react";
import { UniswapContext } from "../../../context/dashboardContext";

const UniswapMetrics = () => {
  const { values } = useContext(UniswapContext);
  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-between">
          <div className="text-lightest-gray">Maximum sold</div>
          <div>401 {values.second.currency}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="text-lightest-gray">Price Impact</div>
          <div>0.04%</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="text-lightest-gray">Liquidity Provider Fee</div>
          <div>
            {(values.first.amount * 0.003).toFixed(4)} {values.first.currency}
          </div>
        </div>
      </div>
    </>
  );
};

export default UniswapMetrics;
