import React, { useContext } from "react";
import Card from "../UI/Card";
import { DashboardContext } from "../../context/dashboardContext";
import BorrowRepaySubsection from "./BorrowRepaySubsection";

const DashboardBorrowSection = () => {
  const { onPage, repayProcessState } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];
  let goBack: null | Function = null;

  if (onPage === "Borrow-Repay") {
    const { selectedLoan, setSelectedLoan } = repayProcessState;
    if (selectedLoan) {
      goBack = () => {
        setSelectedLoan(null);
      };
    }
  }

  return (
    <Card className="main-card text-center" title={subSection} goBack={goBack}>
      <div className="my-5">
        {subSection == "Repay" && <BorrowRepaySubsection />}
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
