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
        dashboard={true}
      >
        {success && (
          <SuccessScreen
            fullScreen={false}
            title="Withdraw accepted"
            onButtonClick={() => {
              setSuccess(false);
            }}
            message={
              <div>
                View transaction status{" "}
                <a
                  className="link text-gray"
                  target="_blank"
                  rel="noreferrer"
                  //href="https://etherscan.io/tx/"
                >
                  <u>here</u>.
                </a>
              </div>
            }
            CTA="Go back"
          />
        )}
        {isWithdrawing && (
          <ProcessingScreen
            link=""
            fullScreen={false}
            title="Withdrawing collateral"
          />
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
