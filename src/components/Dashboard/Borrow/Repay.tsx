import React, { useContext } from "react";

import {
  BorrowRepayContext,
  BorrowRepayContextProvider,
} from "../../../context/dashboardContext";
import Card from "../../UI/Card";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import RepayForm from "./RepayForm";
import RepaySelectedLoan from "./RepaySelectedLoan";

const RepayPage = () => {
  const {
    selectedLoan,
    setRepaySuccess,
    repaySuccess,
    isRepaying,
    setSelectedLoan,
  } = useContext(BorrowRepayContext);
  const goBack = () => {
    setSelectedLoan(null);
  };
  return (
    <div>
      <Card
        className="main-card text-center"
        title={selectedLoan ? `ID ${selectedLoan.id}` : "Repay"}
        goBack={selectedLoan ? goBack : null}
      >
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
          <ProcessingScreen link={""} title="Repaying" fullScreen={false} />
        )}
        {!repaySuccess && !isRepaying && selectedLoan && <RepaySelectedLoan />}
        {!repaySuccess && !isRepaying && !selectedLoan && <RepayForm />}
      </Card>
    </div>
  );
};

const Repay = () => {
  return (
    <BorrowRepayContextProvider>
      <RepayPage />
    </BorrowRepayContextProvider>
  );
};

export default Repay;
