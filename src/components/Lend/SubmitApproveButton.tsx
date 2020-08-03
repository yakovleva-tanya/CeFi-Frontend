import React, { useState, useContext } from "react";
import Lottie from "react-lottie";
import { Check } from "react-bootstrap-icons";
import { approveDai } from "../../models/Contracts";
import { AppContext, AppContextState } from "../../context/app";
import * as animationData from "../../../dist/assets/loading_animation.json";

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
          !loggedIn || approving
            ? "disabled text-lightest-gray"
            : "pointer text-black"
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
        <LoadingAnimation isStopped={!approving} />
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

interface animationProps {
  isStopped: boolean;
}

const LoadingAnimation = ({ isStopped }: animationProps) => {
  return (
    <div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={24}
        width={24}
        isStopped={isStopped}
      />
    </div>
  );
};
