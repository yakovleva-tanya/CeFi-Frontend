import React, { useContext } from "react";
import Card from "../UI/Card";
import { DashboardContext } from "../../context/dashboardContext";

const DashboardBorrowSection = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <Card className="main-card text-center" title={subSection}>
      <div className="my-5">
        {subSection == "Repay" && (
          <div>
            <div>Outstanding loans</div>
            <div>Overdue loans</div>
            <div>Repaid loans</div>
          </div>
        )}
        {subSection == "Deposit" && (
          <div className="text-gray">
            Select the loan you want to deposit into
          </div>
        )}
        {subSection == "Withdraw" && (
          <div className="text-gray">
            Select the loan you want to withdraw collateral from
          </div>
        )}
      </div>
    </Card>
  );
};

export default DashboardBorrowSection;
