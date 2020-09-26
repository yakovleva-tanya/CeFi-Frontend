import React, { useContext } from "react";

import UniswapBottomRow from "./UniswapBottomRow";
import UniswapTopRow from "./UniswapTopRow";
import UniswapButtonGroup from "./UniswapButtonGroup";
import UniswapPrice from "./UniswapPrice";
import UniswapMetrics from "./UniswapMetrics";
import UniswapArrow from "./UniswapArrow";

import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/dashboardContext";

const UniswapForm = () => {
  const { values } = useContext(UniswapContext);
  const { state } = useContext(AppContext);
  const { teller } = state;

  return (
    <div className="d-flex flex-column">
      {teller && teller.userWalletBalance && (
        <>
          <UniswapTopRow />
          <UniswapArrow />
          <UniswapBottomRow />
          {values.second && <UniswapPrice />}
          <UniswapButtonGroup />
          {values.second && <UniswapMetrics />}
        </>
      )}
    </div>
  );
};

export default UniswapForm;
