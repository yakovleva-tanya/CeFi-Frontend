import React, { useContext } from "react";

import disabledArrow from "../../../../dist/assets/full-gray-arrow-down.svg";
import activeArrow from "../../../../dist/assets/full-primary-arrow-down.svg";

import { UniswapContext } from "../../../context/uniswapContext";

const UniswapArrow = () => {
  const { trade, isExactIn, setIsExactIn } = useContext(UniswapContext);

  return (
    <div
      className="mt-2"
      onClick={() => {
        //setIsExactIn(!isExactIn);
      }}
    >
      <img height={14} src={trade ? activeArrow : disabledArrow} />
    </div>
  );
};

export default UniswapArrow;
