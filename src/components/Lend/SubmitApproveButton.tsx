import React, { useState, useContext } from "react";
import {
  AppContext,
  AppContextState,
  TellerTokens,
  BaseTokens,
  mapLendingTokensToTellerTokens,
} from "../../context/app";
import { approveDai } from "../../models/Contracts";
import { CustomSubmitButton } from "../UI/CustomSubmitButton";
import { LendPageContext } from "../../context/lendContext";
import copy from "../../copy.json";

const SubmitApproveButton = () => {
  const {
    selectedAmount,
    tokensApproved,
    setTokensApproved,
    selectedCurrency,
  } = useContext(LendPageContext);

  const { state, updateAppState } = useContext(AppContext);
  const [approving, setApproving] = useState(false);
  const loggedIn = state.web3State?.address || "";
  const transactionErrorMessage =
    copy.pages.deposit.main.transactionErrorMessage;

  const approve = async () => {
    const tellerTokens = mapLendingTokensToTellerTokens(selectedCurrency);
    const primaryAddress = state.web3State.address;
    const { lendingPool } = state.teller
      ? state.teller.contracts[BaseTokens.ETH][tellerTokens]
      : null;
    // TODO: this should update based on the selected ATM type.
    try {
      await approveDai(
        lendingPool,
        state.web3State,
        primaryAddress,
        selectedAmount
      );
      setApproving(false);
      setTokensApproved(true);
    } catch (error) {
      setApproving(false);
      console.log(error)
      updateAppState((st: AppContextState) => {
        const errorModal = {
          show: true,
          message: { transactionErrorMessage },
          title: "Error",
        };
        return { ...st, errorModal };
      });
    }
  };
  const onClickAction = () => {
    if (loggedIn) {
      setApproving(true);
      if (process.env.INTEGRATIONS_DISABLED === "true") {
        setTokensApproved(true);
        setApproving(false);
      } else {
        approve();
      }
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
