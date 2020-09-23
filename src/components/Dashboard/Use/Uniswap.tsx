import React from "react";
import { UniswapContextProvider } from "../../../context/dashboardContext";

import UniswapMainSection from "./UniswapMainSection";

const UniswapPage = () => {
  return (
    <div>
      <UniswapMainSection />
    </div>
  );
};

const Uniswap = () => {
  return (
    <UniswapContextProvider>
      <UniswapPage />
    </UniswapContextProvider>
  );
};

export default Uniswap;
