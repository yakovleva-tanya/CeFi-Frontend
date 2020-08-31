import React, { useContext } from "react";
import Card from "../../UI/Card";
import { DashboardContext } from "../../../context/dashboardContext";
import Repay from "./Repay";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

const Borrow = () => {
  const { onPage, repayProcessState } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];
  let goBack: null | Function = null;
  const { selectedLoan, setSelectedLoan } = repayProcessState;
  let pageTitle = subSection;
  if (subSection === "Withdraw") {
    pageTitle = "Withdraw Collateral";
  }
  if (onPage === "Borrow-Repay") {
    if (selectedLoan) {
      goBack = () => {
        setSelectedLoan(null);
      };
    }
  }
  if (onPage === "Borrow-Repay") {
    if (selectedLoan) {
      goBack = () => {
        setSelectedLoan(null);
      };
    }
  }

  return (
    <Card className="main-card text-center" title={pageTitle} goBack={goBack}>
      <div className="my-5">
        {subSection == "Repay" && <Repay />}
        {subSection == "Deposit" && <Deposit />}
        {subSection == "Withdraw" && <Withdraw />}
      </div>
    </Card>
  );
};

export default Borrow;
