import React, { useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";

const ProTip = () => {
  const { submenu, stage, borrowRequest } = useContext(BorrowPageContext);
  const isSecured = Boolean(borrowRequest.loanType === "Secured");
  const zeroCollateral = Boolean(borrowRequest.collateralPercent === 0);

  return (
    <div className="text-lg">
      {stage <= 1 && (
        <div>
          {(submenu === null || submenu === "LoanSize") &&
            "Connect to your bank account to reduce collateral ratios."}
          {submenu === "LoanTerm" &&
            "Set your duration of loan term in accordance to your planned use of the loan."}
          {submenu === "CollateralPercent" &&
            "Higher collateral ratios can reduce your interest rate."}
        </div>
      )}
      {stage === 2 && (
        <div>
          {!isSecured &&
            zeroCollateral &&
            "Interest rates are calculated as a result of your credit history."}
          {!isSecured &&
            !zeroCollateral &&
            "Your collateral ratio is set to the minimum amount of collateral needed."}
          {isSecured &&
            !zeroCollateral &&
            "Accept terms to approve a transaction spend."}
        </div>
      )}
      {stage === 3 && (
        <div>
          {!submenu &&
            zeroCollateral &&
            "Once a loan is requested you will need to resubmit terms to make changes. "}
          {!submenu &&
            !zeroCollateral &&
            "You can increase your collateral amount to reduce liquidation risk. "}
          {submenu === "CollateralAmount" &&
            "Increase your collateral amount to reduce liquidation risk."}
        </div>
      )}
    </div>
  );
};

export default ProTip;
