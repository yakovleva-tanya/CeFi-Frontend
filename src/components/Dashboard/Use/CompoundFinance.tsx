import React, { useContext } from "react";
import {
  UseCompoundContext,
  UseCompoundContextProvider,
} from "../../../context/dashboardContext";

import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import UseCompoundMainSection from "./UseCompoundMainSection";

const CompoundFinancePage = () => {
  const {
    success,
    setSuccess,
    isWithdrawing,
    isSupplying,
    successMessage,
  } = useContext(UseCompoundContext);

  return (
    <div>
      {success && (
        <SuccessScreen
          fullScreen={false}
          title={successMessage}
          onButtonClick={() => {
            setSuccess(false);
          }}
          message={
            <div>
              View transaction status{" "}
              <a className="link text-gray">
                <u>here</u>
              </a>
              .
            </div>
          }
          CTA="Go back"
        />
      )}
      {isWithdrawing && (
        <ProcessingScreen
          link=""
          fullScreen={false}
          title="Withdrawing deposit"
        />
      )}
      {isSupplying && (
        <ProcessingScreen link="" fullScreen={false} title="Depositing" />
      )}
      {!success && !isWithdrawing && !isSupplying && <UseCompoundMainSection />}
    </div>
  );
};

const CompoundFinance = () => {
  return (
    <UseCompoundContextProvider>
      <CompoundFinancePage />
    </UseCompoundContextProvider>
  );
};

export default CompoundFinance;
