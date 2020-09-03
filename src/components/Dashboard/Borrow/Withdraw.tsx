import React, { useContext } from "react";
import Card from "../../UI/Card";
import {
  BorrowWithdrawContext,
  BorrowWithdrawContextProvider,
} from "../../../context/dashboardContext";

import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import WithdrawMainSection from "./WithdrawMainSection";

const WithdrawPage = () => {
  const {
    success,
    setSuccess,
    isWithdrawing,
    setSelectedLoan,
    selectedLoan,
  } = useContext(BorrowWithdrawContext);

  const goBack = () => {
    setSelectedLoan(null);
  };
  return (
    <div>
      <Card
        className="text-center main-card"
        title={selectedLoan ? `ID ${selectedLoan.id}` : "Withdraw Collateral"}
        goBack={selectedLoan ? goBack : null}
      >
        {success && (
          <SuccessScreen
            fullScreen={false}
            title="Withdraw accepted"
            onButtonClick={() => {
              setSuccess(false);
            }}
            message={<div>You’ve withdrawed your loan!</div>}
          />
        )}
        {isWithdrawing && (
          <ProcessingScreen link="" fullScreen={false} title="Withdrawing collateral" />
        )}
        {!success && !isWithdrawing && <WithdrawMainSection />}
      </Card>
    </div>
  );
};

const Withdraw = () => {
  return (
    <BorrowWithdrawContextProvider>
      <WithdrawPage />
    </BorrowWithdrawContextProvider>
  );
};
export default Withdraw;
