import React, { useState, useContext } from "react";
import WarningModal from "../UI/WarningModal";
import { CustomDropdown } from "../UI/CustomDropdown";
import { LendPageContext } from "../../context/lendContext";
import { AvailableLendingTokens } from "../../context/app";

const CurrencyDropdown = () => {
  const {
    selectedCurrency,
    tokensApproved,
    setTokensApproved,
    setSelectedCurrency,
  } = useContext(LendPageContext);

  const currencies: Array<AvailableLendingTokens> = [
    AvailableLendingTokens.DAI,
    AvailableLendingTokens.USDC,
  ];

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
      <WarningModal
        show={showWarningModal}
        proceed={proceedWithChange}
        cancel={cancelChange}
        text="You're about to change your supply asset, doing so will submit another
          transaction approval and cost additional gas fees. Are you sure you
          want to proceed?"
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
