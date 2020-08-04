import React, { useState, useContext } from "react";
import { approveDai } from "../../models/Contracts";
import { AppContext, AppContextState } from "../../context/app";
import { CustomSubmitButton } from "../UI/CustomSubmitButton";

type SubmitApproveType = {
  amount: number;
  loggedIn: string;
  tokensApproved: boolean;
  setTokensApproved: Function;
};

const SubmitApproveButton = ({
  amount,
  loggedIn,
  tokensApproved,
  setTokensApproved,
}: SubmitApproveType) => {
  const [approving, setApproving] = useState(false);
  const { state, updateAppState } = useContext(AppContext);
  const approve = async () => {
    const primaryAddress = state.web3State.address;
    const { lendingPool } = state.zeroCollateral.contracts;
    try {
      await approveDai(lendingPool, state.web3State, primaryAddress, amount);
      setApproving(false);
      setTokensApproved(true);
    } catch (error) {
      setApproving(false);
      updateAppState((st: AppContextState) => {
        const errorModal = {
          show: true,
          message:
            "An error occurred during the lending process. Please try again.",
          title: "Error",
        };
        return { ...st, errorModal };
      });
    }
  };
  const onClickAction = () => {
    if (loggedIn) {
      setApproving(true);
      approve();
    }
  };
  return (
    <CustomSubmitButton
      onClickAction={onClickAction}
      disabled={!loggedIn || approving}
      loading={approving}
      approved={tokensApproved}
      text="Submit"
    />
  );
};

export default SubmitApproveButton;
