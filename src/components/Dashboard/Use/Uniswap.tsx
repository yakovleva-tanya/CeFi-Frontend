import React, { useContext } from "react";
import {
  UniswapContext,
  UniswapContextProvider,
} from "../../../context/dashboardContext";

// import SuccessScreen from "../../SuccessScreen/SuccessScreen";
// import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import UniswapMainSection from "./UniswapMainSection";

const UniswapPage = () => {
  // const { } = useContext(UniswapContext);
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
