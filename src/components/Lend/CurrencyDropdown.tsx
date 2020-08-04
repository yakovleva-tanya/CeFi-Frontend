import React, { useState } from "react";
import AssetChangeWarningModal from "../AssetChangeWarningModal/AssetChangeWarningModal";
import { CustomDropdown } from "../UI/CustomDropdown";

type DropdownType = {
  currencies: Array<string>;
  currency: string;
  setCurrency: Function;
  tokensApproved: boolean;
  setTokensApproved: Function;
};

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  tokensApproved,
  setTokensApproved,
}: DropdownType) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [newCurrency, setNewCurrency] = useState("");

  const handleSelect = (eventKey: any, e?: React.SyntheticEvent<{}>) => {
    if (tokensApproved) {
      setNewCurrency(eventKey);
      setShowWarningModal(true);
    } else {
      setCurrency(eventKey);
    }
  };

  const cancelChange = () => {
    setShowWarningModal(false);
  };
  const proceedWithChange = () => {
    setShowWarningModal(false);
    setCurrency(newCurrency);
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
        selected={currency}
        handleSelect={handleSelect}
        options={currencies}
      />
    </div>
  );
};
export default CurrencyDropdown;
