import React, { useState, useContext } from "react";
import { Check } from "react-bootstrap-icons";
import { approveDai } from "../../models/Contracts";
import { AppContext, AppContextState } from "../../context/app";

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

  return (
    <div className="d-flex flex-row align-items-center">
      <div
        className={`py-1 px-3 border-thin  ${
          !loggedIn || approving ? "disabled" : "pointer"
        }`}
        onClick={() => {
          if (loggedIn) {
            setApproving(true);
            approve();
          }
        }}
      >
        Submit
      </div>
      {approving ? (
        <div>approving</div>
      ) : (
        <Check
          className={`${
            tokensApproved ? `text-green` : `text-lightest-gray`
          } text-lg ml-2`}
          size={24}
        />
      )}
    </div>
  );
};

export default SubmitApproveButton;
