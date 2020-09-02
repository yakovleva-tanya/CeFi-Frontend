import React, { useContext } from "react";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import {
  LendClaimContextProvider,
  LendClaimContext,
} from "../../../context/dashboardContext";
import ClaimMainSection from "./ClaimMainSection";

const ClaimPage = () => {
  const { success, setSuccess, isCollecting } = useContext(LendClaimContext);

  return (
    <div>
      {isCollecting && (
        <ProcessingScreen
          title="Collecting Interest"
          link=""
          fullScreen={false}
        />
      )}
      {success && (
        <SuccessScreen
          title="Interest Collected!"
          message={
            <div>
              View your{" "}
              <a target="_blank" rel="noreferrer" href="">
                claim transaction.
              </a>
            </div>
          }
          fullScreen={false}
          onButtonClick={() => {
            setSuccess(false);
          }}
        />
      )}
      {!isCollecting && !success && <ClaimMainSection />}
    </div>
  );
};

const Claim = () => {
  return (
    <LendClaimContextProvider>
      <ClaimPage />
    </LendClaimContextProvider>
  );
};

export default Claim;
