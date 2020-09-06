import React, { useContext } from "react";
import { DashboardContext } from "../../../context/dashboardContext";
import CompoundFinance from "./CompoundFinance";
import Uniswap from "./Uniswap";

const Use = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <div>
      {subSection == "Compound" && <CompoundFinance />}
      {subSection == "Uniswap" && <Uniswap />}
    </div>
  );
};

export default Use;
