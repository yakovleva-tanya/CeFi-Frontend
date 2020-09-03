import React, { useContext } from "react";

import {
  BorrowDepositContextProvider,
  BorrowDepositContext,
} from "../../../context/dashboardContext";
import Card from "../../UI/Card";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import DepositMainSection from "./DepositMainSection";

const DepositPage = () => {
  const {
    success,
    setSuccess,
    isDepositing,
    setSelectedLoan,
    selectedLoan,
  } = useContext(BorrowDepositContext);
  const goBack = () => {
    setSelectedLoan(null);
  };
  return (
    <div>
      <Card
        className="main-card text-center"
        title={selectedLoan ? `ID ${selectedLoan.id}` : "Deposit collateral"}
        goBack={selectedLoan ? goBack : null}
      >
        {success && (
          <SuccessScreen
            fullScreen={false}
            title="Deposit accepted"
            onButtonClick={() => {
              setSuccess(false);
            }}
            message={<div>You’ve deposited your loan!</div>}
          />
        )}
        {isDepositing && (
          <ProcessingScreen link="" fullScreen={false} title="Depositing collateral" />
        )}
        {!success && !isDepositing && <DepositMainSection />}
      </Card>
    </div>
  );
};

const Deposit = () => {
  return (
    <BorrowDepositContextProvider>
      <DepositPage />
    </BorrowDepositContextProvider>
  );
};

export default Deposit;
