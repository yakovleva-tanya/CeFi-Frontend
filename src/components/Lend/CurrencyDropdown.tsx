import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import AssetChangeWarningModal from "../AssetChangeWarningModal/AssetChangeWarningModal";

type DropdownType = {
  currency: string;
  setCurrency: Function,
  tokensSubmitted: boolean
};

const CurrencyDropdown = ({ currency, setCurrency, tokensSubmitted}: DropdownType) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [newCurrency, setNewCurrency] = useState('');

  const handleSelect = (
    eventKey: any,
    e?: React.SyntheticEvent<{}>
  ) => {
    if (tokensSubmitted) {
      setNewCurrency(eventKey)
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
  };

  return (
      <div>
      <AssetChangeWarningModal
        show={showWarningModal}
        proceed={proceedWithChange}
        cancel={cancelChange}
      />
        <Dropdown>
        <Dropdown.Toggle
          variant="link"
          id="toggle"
          className="dropdown font-medium p-1 text-gray"
        >
          {`${currency}   `}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="DAI" onSelect={handleSelect}>
            DAI
          </Dropdown.Item>
          <Dropdown.Item eventKey="USDT" onSelect={handleSelect}>
            USDT
          </Dropdown.Item>
          <Dropdown.Item eventKey="USDC" onSelect={handleSelect}>
            USDC
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown></div>
  );
};
export default CurrencyDropdown;
