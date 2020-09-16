import React, { useContext } from "react";
import Card from "../../UI/Card";
import { DashboardContext } from "../../../context/dashboardContext";
import Claim from "./Claim";
import Withdraw from "./Withdraw";

const Lend = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];
  return (
    <Card className="main-card text-center" title={subSection} dashboard={true}>
      <div className="my-4">
        {subSection == "Redeem" && <Claim />}
        {subSection == "Withdraw" && <Withdraw />}
      </div>
    </Card>
  );
};
export default Lend;
