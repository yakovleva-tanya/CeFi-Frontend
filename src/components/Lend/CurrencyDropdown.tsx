import React, { useState, useContext } from "react";
import {
  TellerTokens,
} from "../../context/app";
import AssetChangeWarningModal from "../AssetChangeWarningModal/AssetChangeWarningModal";
import { CustomDropdown } from "../UI/CustomDropdown";
import { LendPageContext } from "../../context/lendContext";

const CurrencyDropdown = () => {
  const {
    selectedCurrency,
    tokensApproved,
    setTokensApproved,
    setSelectedCurrency,
  } = useContext(LendPageContext);

  const currencies = ["DAI", "USDC"];
  // Maps human readable currencies to backend teller token types.
  const tellerMap: { [key in string] : TellerTokens } = {
    "DAI": TellerTokens.tDAI,
    "USDC": TellerTokens.tUSDC
  };

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [newCurrency, setNewCurrency] = useState("");

  const handleSelect = (eventKey: any, e?: React.SyntheticEvent<{}>) => {
    if (tokensApproved) {
      setNewCurrency(eventKey);
      setShowWarningModal(true);
    } else {
      setSelectedCurrency(tellerMap[eventKey]);
    }
  };

  const cancelChange = () => {
    setShowWarningModal(false);
  };
  const proceedWithChange = () => {
    setShowWarningModal(false);
    setSelectedCurrency(newCurrency);
    setTokensApproved(false);
  };

  return (
    <div>
      <AssetChangeWarningModal
        show={showWarningModal}
        proceed={proceedWithChange}
        cancel={cancelChange}
      />
      <CustomDropdown
        selected={selectedCurrency}
        handleSelect={handleSelect}
        options={currencies}
      />
    </div>
  );
};
export default CurrencyDropdown;
