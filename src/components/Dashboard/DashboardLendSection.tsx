import React, { useContext } from "react";
import Card from "../UI/Card";
import { DashboardContext } from "../../context/dashboardContext";
import LendClaimSubsection from './LendClaimSubsection';
import LendWithdrawSubsection from './LendWithdrawSubsection';

const DashboardLendSection = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];
  return (
    <Card className="main-card text-center" title={subSection}>
      <div className="my-5">
        {subSection == "Claim" && <LendClaimSubsection />}
        {subSection == "Withdraw" && <LendWithdrawSubsection />}
      </div>
    </Card>
  );
};
export default DashboardLendSection;

