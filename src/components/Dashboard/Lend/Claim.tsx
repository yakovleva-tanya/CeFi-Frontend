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
        <ProcessingScreen title="Redeeming APY" link="" fullScreen={false} />
      )}
      {success && (
        <SuccessScreen
          title="Redemption accepted"
          message={
            <div>
              View your transaction status{" "}
              <a
                target="_blank"
                rel="noreferrer"
                //href=''
                className="link text-gray"
              >
                <u>here</u>
              </a>
              .
            </div>
          }
          fullScreen={false}
          onButtonClick={() => {
            setSuccess(false);
          }}
          CTA = "Go back"
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
