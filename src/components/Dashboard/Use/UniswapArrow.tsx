import React, { useContext } from "react";

import disabledArrow from "../../../../dist/assets/full-gray-arrow-down.svg";
import activeArrow from "../../../../dist/assets/full-primary-arrow-down.svg";

import { UniswapContext } from "../../../context/dashboardContext";

const UniswapArrow = () => {
  const { values } = useContext(UniswapContext);
  return (
    <div className="mt-2">
      <img height={14} src={values.second ? activeArrow : disabledArrow} />
    </div>
  );
};

export default UniswapArrow;
