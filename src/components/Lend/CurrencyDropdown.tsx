import React, { useState, useContext } from "react";
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

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [newCurrency, setNewCurrency] = useState("");

  const handleSelect = (eventKey: any, e?: React.SyntheticEvent<{}>) => {
    if (tokensApproved) {
      setNewCurrency(eventKey);
      setShowWarningModal(true);
    } else {
      setSelectedCurrency(eventKey);
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
