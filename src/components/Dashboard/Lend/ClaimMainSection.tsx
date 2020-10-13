import React, { useContext } from "react";
import PrimaryButton from "../../UI/PrimaryButton";
import TableRow from "../../UI/TableRow";
import BR from "../../UI/BR";
import { CustomSubmitButton } from "../../UI/CustomSubmitButton";
import WarningModal from "../../UI/WarningModal";
import {
  claimInterest,
  collectInterest,
} from "../../../actions/DashboardLendActions";
import { LendClaimContext } from "../../../context/dashboardContext";
import copy from "../../../copy.json";

const ClaimMainSection = () => {
  const {
    setSuccess,
    setCollecting,
    assetChangeWarning,
    setAssetChangeWarning,
    isClaiming,
    setClaiming,
    assetClaimed,
    setAssetClaimed,
  } = useContext(LendClaimContext);
  //TODO import currencies from wallet
  const assets: any = {
    DAI: 100,
    USDC: 204,
    TLR: 12,
    COMP: 20,
  };

  const onAssetClaim = (asset: string) => {
    if (assetClaimed) {
      setAssetChangeWarning(asset);
      return;
    } else {
      processClaimInterest(asset);
    }
  };

  const processClaimInterest = async (asset: string) => {
    if (isClaiming) return;
    setClaiming(asset);
    const res = await claimInterest(asset);
    if (res) {
      setAssetClaimed(asset);
    }
    setClaiming("");
  };

  const processCollectInterest = async () => {
    setCollecting(true);
    const res = await collectInterest(assetClaimed);
    setCollecting(false);
    setSuccess(res);
    setAssetClaimed("");
  };
  const {
    description,
    assetChangeWarningMessage,
    claimCTA,
    redeemCTA,
  } = copy.pages.dashboard["deposit-redeem"];

  return (
    <div className="my-2">
      <div className="text-gray mb-2">{description}</div>
      <div className="border-thin my-4">
        {Object.keys(assets).map((currency, i) => {
          const amount = assets[currency];
          const title = `${amount} ${currency}`;
          return (
            <div key={currency}>
              <WarningModal
                text={assetChangeWarningMessage}
                show={assetChangeWarning === currency}
                proceed={async () => {
                  setAssetChangeWarning("");
                  await processClaimInterest(currency);
                }}
                cancel={() => {
                  setAssetChangeWarning("");
                }}
              />
              <TableRow title={title} currency={currency}>
                <CustomSubmitButton
                  text={claimCTA}
                  onClickAction={() => {
                    if (amount !== 0) {
                      onAssetClaim(currency);
                    }
                  }}
                  disabled={
                    (!!assetClaimed && assetClaimed !== currency) ||
                    amount === 0
                  }
                  loading={isClaiming === currency}
                  approved={assetClaimed === currency}
                />
              </TableRow>
              {i !== Object.keys(assets).length - 1 && <BR />}
            </div>
          );
        })}
      </div>
      <PrimaryButton
        disabled={!assetClaimed}
        text={redeemCTA}
        onClick={processCollectInterest}
      />
    </div>
  );
};

export default ClaimMainSection;
