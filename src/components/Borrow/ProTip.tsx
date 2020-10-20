import React, { useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import copy from "../../copy.json";

const ProTip = () => {
  const { submenu, stage, borrowRequest } = useContext(BorrowPageContext);
  const isSecured = Boolean(borrowRequest.loanType === "Secured");
  const zeroCollateral = Boolean(borrowRequest.collateralPercent === 0);
  const proTips = copy.pages.borrow.main.form.proTips;

  return (
    <div className="text-lg">
      {stage <= 1 && (
        <div>
          {(submenu === null || submenu === "LoanSize") && proTips[1]}
          {submenu === "LoanTerm" && proTips[2]}
          {submenu === "CollateralPercent" && proTips[3]}
        </div>
      )}
      {stage === 2 && (
        <div>
          {!isSecured && zeroCollateral && proTips[4]}
          {!isSecured && !zeroCollateral && proTips[5]}
          {isSecured && !zeroCollateral && proTips[6]}
        </div>
      )}
      {stage === 3 && (
        <div>
          {!submenu && zeroCollateral && proTips[7]}
          {!submenu && !zeroCollateral && proTips[8]}
          {submenu === "CollateralAmount" && proTips[9]}
        </div>
      )}
    </div>
  );
};

export default ProTip;
