import React, { useContext, useState } from "react";
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
import { AppContext, AppContextState } from "../../../context/app";

const ClaimMainSection = () => {
  const { state, updateAppState } = useContext(AppContext);
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
  const [claimedAmount, setClaimedAmount] = useState(0);
  //TODO import currencies from wallet
  const assets = state.demoData.APYs;

  const onAssetClaim = (asset: string) => {
    if (assetClaimed) {
      setAssetChangeWarning(asset);
      return;
    } else {
      processClaimInterest(asset);
    }
  };

  const processClaimInterest = async (asset: string) => {
    setClaiming(asset);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAssetClaimed(asset);
    setClaiming("");
  };

  const processCollectInterest = async () => {
    setCollecting(true);
    updateAppState((st: AppContextState) => {
      const APYs = st.demoData.APYs;
      APYs[assetClaimed] -= claimedAmount;
      const walletBalances = st.demoData.walletBalances;
      walletBalances[assetClaimed] += claimedAmount;
      const demoData = { ...st.demoData, walletBalances, APYs };
      return { ...st, demoData };
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCollecting(false);
    setSuccess(true);
    setAssetClaimed("");
  };
  return (
    <div>
      <div className="text-gray mb-2">
        Select an asset to redeem your APY to date.
      </div>
      <div className="border-thin my-4">
        {Object.keys(assets).map((currency) => {
          const amount = assets[currency];
          const title = `${amount} ${currency}`;
          return (
            <div key={currency}>
              <WarningModal
                text="Redeeming your APY will submit a transaction and incur gas fees. Costs will be debited from your wallet. Are you sure you want to proceed?"
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
                  text="Claim"
                  onClickAction={() => {
                    if (amount !== 0) {
                      setClaimedAmount(amount);
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
              <BR />
            </div>
          );
        })}
      </div>
      <PrimaryButton
        disabled={!assetClaimed}
        text="Redeem"
        onClick={processCollectInterest}
      />
    </div>
  );
};

export default ClaimMainSection;
