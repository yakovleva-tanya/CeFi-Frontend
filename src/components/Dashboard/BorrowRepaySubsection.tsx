import React, { useContext } from "react";

import { DashboardContext } from "../../context/dashboardContext";

import SuccessScreen from "../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../ProcessingScreen/ProcessingScreen";
import RepayMainSection from "./RepayMainSection";
import RepaySelectedLoan from "./RepaySelectedLoan";

const BorrowRepaySubsection = () => {
  const { repayProcessState } = useContext(DashboardContext);

  const {
    selectedLoan,
    setRepaySuccess,
    repaySuccess,
    isRepaying,
  } = repayProcessState;

  return (
    <div>
      {repaySuccess && (
        <SuccessScreen
          link=""
          version="repay"
          fullScreen={false}
          onButtonClick={() => {
            setRepaySuccess(false);
          }}
        />
      )}
      {isRepaying && (
        <ProcessingScreen link="" title="Repaying" fullScreen={false} />
      )}
      {!selectedLoan && !repaySuccess && !isRepaying && <RepayMainSection />}
      {selectedLoan && <RepaySelectedLoan />}
    </div>
  );
};

export default BorrowRepaySubsection;
