import React, { useContext, useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { MockSubmitButton } from "../UI/CustomSubmitButton";
import WarningModal from "../UI/WarningModal";

const LendClaimSubsection = () => {
  const [success, setSuccess] = useState(false);
  const [isCollecting, setCollecting] = useState(false);
  const [assetChangeWarning, setAssetChangeWarning] = useState(true);

  return (
    <div>
      <WarningModal
        text="You're about to change your supply asset, doing so will submit another transaction approval and cost additional gas fees. Are you sure you want to proceed?"
        show={assetChangeWarning}
        proceed={() => {
          setAssetChangeWarning(false);
        }}
        cancel={() => {
          setAssetChangeWarning(false);
        }}
      />
      <div className="text-gray mb-2">
        Select an asset to claim interest/rewards on
      </div>
      <div className="border-thin my-4">
        <TableRow title="100 DAI - $100 ">
          <MockSubmitButton text="Claim" />
        </TableRow>
        <BR />
        <TableRow title=" 204 USDC - $204.20  ">
          <MockSubmitButton text="Claim" />
        </TableRow>
        <BR />
        <TableRow title="12 TRL - $245.90 ">
          <MockSubmitButton text="Claim" />
        </TableRow>
        <BR />
        <TableRow title="20 COMP - $10.20 ">
          <MockSubmitButton text="Claim" />
        </TableRow>
      </div>
      <PrimaryButton text="Collect Interest" />
    </div>
  );
};

export default LendClaimSubsection;
