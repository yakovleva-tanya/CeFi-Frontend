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
import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";

const Claim = () => {
  const [success, setSuccess] = useState(false);
  const [isCollecting, setCollecting] = useState(false);
  const [assetChangeWarning, setAssetChangeWarning] = useState("");
  const [isClaiming, setClaiming] = useState("");
  const [assetClaimed, setAssetClaimed] = useState("");
  //TODO import currencies from wallet
  const assets = [
    { currency: "DAI", amount: 100 },
    { currency: "USDC", amount: 204 },
    { currency: "TRL", amount: 12 },
    { currency: "COMP", amount: 20 },
  ];

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
  };

  return (
    <div>
      {isCollecting && (
        <ProcessingScreen
          title="Collecting Interest"
          link=""
          fullScreen={false}
        />
      )}
      {success && (
        <SuccessScreen
          title="Interest Collected!"
          message={
            <div>
              View your{" "}
              <a target="_blank" rel="noreferrer" href="">
                claim transaction.
              </a>
            </div>
          }
          fullScreen={false}
          onButtonClick={() => {
            setSuccess(false);
          }}
        />
      )}
      {!isCollecting && !success && (
        <div>
          <div className="text-gray mb-2">
            Select an asset to claim interest/rewards on
          </div>

          <div className="border-thin my-4">
            {assets.map((asset) => {
              const { currency, amount } = asset;
              const title = `${amount} ${currency} - $${amount}`;

              return (
                <div key={currency}>
                  <WarningModal
                    text="You're about to change your supply asset, doing so will submit another transaction approval and cost additional gas fees. Are you sure you want to proceed?"
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
                      onClickAction={() => onAssetClaim(currency)}
                      disabled={!!assetClaimed}
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
            text="Collect Interest"
            onClick={processCollectInterest}
          />
        </div>
      )}
    </div>
  );
};

export default Claim;
