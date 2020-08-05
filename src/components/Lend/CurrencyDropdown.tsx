import React, { useState, useContext } from "react";
import { AppContext, AppContextState } from "../../context/app";
import AssetChangeWarningModal from "../AssetChangeWarningModal/AssetChangeWarningModal";
import { CustomDropdown } from "../UI/CustomDropdown";

const CurrencyDropdown = () => {
  const currencies = ["DAI", "USDT", "USDC"];
  const { state, updateAppState } = useContext(AppContext);
  const { selectedCurrency, tokensApproved } = state.lendPage;

  const setTokensApproved = (tokensApproved: boolean) => {
    updateAppState((st: AppContextState) => {
      const lendPage = st.lendPage;
      lendPage.tokensApproved = tokensApproved;
      return { ...st, lendPage };
    });
  };

  const setCurrency = (selectedCurrency: string) => {
    updateAppState((st: AppContextState) => {
      const lendPage = st.lendPage;
      lendPage.selectedCurrency = selectedCurrency;
      return { ...st, lendPage };
    });
  };

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
        selected={selectedCurrency}
        handleSelect={handleSelect}
        options={currencies}
      />
    </div>
  );
};
export default CurrencyDropdown;
