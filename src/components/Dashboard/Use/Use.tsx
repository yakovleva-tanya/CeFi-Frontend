import React, { useContext } from "react";
import Card from "../../UI/Card";
import { DashboardContext } from "../../../context/dashboardContext";
import CompoundFinance from "./CompoundFinance";

const Use = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <Card className="main-card text-center" title={subSection}>
      <div className="my-5">
        {subSection == "Compound Finance" && <CompoundFinance />}
        {subSection == "Uniswap" && <div className="text-gray">Uniswap</div>}
      </div>
    </Card>
  );
};

export default Use;
