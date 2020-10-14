import React, { useContext } from "react";
import Card from "../../UI/Card";
import { DashboardContext } from "../../../context/dashboardContext";
import Claim from "./Claim";
import Withdraw from "./Withdraw";

const Lend = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];
  return (
    <Card
      className="main-card text-center"
      title={subSection.charAt(0).toUpperCase() + subSection.slice(1)}
      dashboard={true}
    >
      <div className="my-4">
        {subSection == "redeem" && <Claim />}
        {subSection == "withdraw" && <Withdraw />}
      </div>
    </Card>
  );
};
export default Lend;
