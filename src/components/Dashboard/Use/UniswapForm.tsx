import React, { useContext } from "react";

import UniswapOutputField from "./UniswapOutputField";
import UniswapInputField from "./UniswapInputField";
import UniswapButtonGroup from "./UniswapButtonGroup";
import UniswapPrice from "./UniswapPrice";
import UniswapMetrics from "./UniswapMetrics";
import UniswapArrow from "./UniswapArrow";

import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/uniswapContext";

const UniswapForm = () => {
  const { trade } = useContext(UniswapContext);
  const { state } = useContext(AppContext);
  const { teller } = state;

  return (
    <div className="d-flex flex-column">
      {teller && teller.userWalletBalance && (
        <>
          <UniswapInputField />
          <UniswapArrow />
          <UniswapOutputField />
          {trade && <UniswapPrice />}
          <UniswapButtonGroup />
          {trade && <UniswapMetrics />}
        </>
      )}
    </div>
  );
};

export default UniswapForm;
