import React, { useContext } from "react";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import {
  LendWithdrawContextProvider,
  LendWithdrawContext,
} from "../../../context/dashboardContext";
import WithdrawMainSection from "./WithdrawMainSection";

const WithdrawPage = () => {
  const { isWithdrawing, success, setSuccess } = useContext(
    LendWithdrawContext
  );

  return (
    <div>
      {success && (
        <SuccessScreen
          fullScreen={false}
          onButtonClick={() => {
            setSuccess(false);
          }}
          title="Withdraw accepted"
          message={
            <div>
              View transaction status{" "}
              <a
                className="link text-gray"
                target="_blank"
                rel="noreferrer"
                href="https://etherscan.io/tx/"
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
          title="Withdrawing deposit"
          fullScreen={false}
        />
      )}
      {!isWithdrawing && !success && <WithdrawMainSection />}
    </div>
  );
};
const Withdraw = () => {
  return (
    <LendWithdrawContextProvider>
      <WithdrawPage />
    </LendWithdrawContextProvider>
  );
};

export default Withdraw;
