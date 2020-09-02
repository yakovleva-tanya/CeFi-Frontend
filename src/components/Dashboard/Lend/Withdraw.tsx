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
          title="You're set!"
          message={
            <div>
              View your{" "}
              <a target="_blank" rel="noreferrer" href="">
                withdraw transaction.
              </a>
            </div>
          }
        />
      )}
      {isWithdrawing && (
        <ProcessingScreen link="" title="Withdrawing" fullScreen={false} />
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
