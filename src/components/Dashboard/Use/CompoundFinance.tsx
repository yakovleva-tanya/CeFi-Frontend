import React, { useContext } from "react";
import {
  UseCompoundContext,
  UseCompoundContextProvider,
} from "../../../context/dashboardContext";

import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import UseCompoundMainSection from "./UseCompoundMainSection";

const CompoundFinancePage = () => {
  const { success, setSuccess, isWithdrawing, isSupplying } = useContext(
    UseCompoundContext
  );

  return (
    <div>
      {success && (
        <SuccessScreen
          fullScreen={false}
          title="You're set!"
          onButtonClick={() => {
            setSuccess(false);
          }}
          message={<div> </div>}
        />
      )}
      {isWithdrawing && (
        <ProcessingScreen link="" fullScreen={false} title="Withdrawing" />
      )}
      {isSupplying && (
        <ProcessingScreen link="" fullScreen={false} title="Supplying" />
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
