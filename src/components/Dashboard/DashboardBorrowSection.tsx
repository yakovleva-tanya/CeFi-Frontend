import React, { useContext } from "react";
import Card from "../UI/Card";
import { DashboardContext } from "../../context/dashboardContext";
import BorrowRepaySubsection from "./BorrowRepaySubsection";
import BorrowDepositSubsection from "./BorrowDepositSubsection";
import BorrowWithdrawSubsection from "./BorrowWithdrawSubsection";

const DashboardBorrowSection = () => {
  const { onPage, repayProcessState } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];
  let goBack: null | Function = null;
  const { selectedLoan, setSelectedLoan } = repayProcessState;

  if (onPage === "Borrow-Repay") {
    if (selectedLoan) {
      goBack = () => {
        setSelectedLoan(null);
      };
    }
  }

  return (
    <Card
      className="main-card text-center"
      title={selectedLoan ? `ID ${selectedLoan.id}` : subSection}
      goBack={goBack}
    >
      <div className="my-5">
        {subSection == "Repay" && <BorrowRepaySubsection />}
        {subSection == "Deposit" && <BorrowDepositSubsection />}
        {subSection == "Withdraw" && <BorrowWithdrawSubsection />}
      </div>
    </Card>
  );
};

export default DashboardBorrowSection;
