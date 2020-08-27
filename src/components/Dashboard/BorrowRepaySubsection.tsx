import React, { useContext } from "react";

import { DashboardContext } from "../../context/dashboardContext";

import SuccessScreen from "../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../ProcessingScreen/ProcessingScreen";
import RepayMainSection from "./RepayMainSection";
import SelectedLoan from "./SelectedLoan";

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
          title="You're set!"
          message={<div>You’ve repaid your loan!</div>}
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
      {selectedLoan && <SelectedLoan />}
    </div>
  );
};

export default BorrowRepaySubsection;
