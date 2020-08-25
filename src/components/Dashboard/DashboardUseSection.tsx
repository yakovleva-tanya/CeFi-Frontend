import React, { useContext } from "react";
import Card from "../UI/Card";
import { DashboardContext } from "../../context/dashboardContext";

const DashboardUseSection = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <Card className="main-card text-center" title={subSection}>
      <div className="my-5">
        {subSection == "Compound Finance" && (
          <div className="text-gray">
            Earn interest by supplying to Compound Finance.
          </div>
        )}
        {subSection == "Uniswap" && <div className="text-gray">Uniswap</div>}
      </div>
    </Card>
  );
};

export default DashboardUseSection;
