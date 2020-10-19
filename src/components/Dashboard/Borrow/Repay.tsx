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
import copy from "../../../copy.json";

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
  const pageCopy = copy.pages.dashboard["borrow-repay"];

  return (
    <div>
      <Card
        className="main-card text-center w-80"
        title={selectedLoan ? `ID ${selectedLoan.id}` : "Repay"}
        goBack={selectedLoan ? goBack : null}
        dashboard={true}
      >
        {repaySuccess && (
          <SuccessScreen
            title={pageCopy.successScreenMessage}
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
            fullScreen={false}
            onButtonClick={() => {
              setRepaySuccess(false);
            }}
            CTA="Go back"
          />
        )}
        {isRepaying && (
          <ProcessingScreen
            link={""}
            title={pageCopy.processingScreenMessage}
            fullScreen={false}
          />
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
