import React, { useContext, useMemo } from "react";
import NumberInput from "../../UI/NumberInput";
import { exchangeCurrency } from "../../../actions/HelperFunctions";
import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/dashboardContext";
import CurrencyIcon from "../../UI/CurrencyIcon";
import dropdownWhite from "../../../../dist/assets/arrow-down-white.svg";
import dropdown from "../../../../dist/assets/arrow-down.svg";

const UniswapBottomRow = () => {
  const { state } = useContext(AppContext);
  const { tokenData, teller } = state;
  const { userWalletBalance } = teller;
  const { values, setValues, options, setTokenSelectionDropdown } = useContext(
    UniswapContext
  );
  const { first, second } = values;

  const onDropdownClick = () => {
    setTokenSelectionDropdown({
      tokens: options.filter((option) => {
        return option != first.currency;
      }),
      type: "Second",
    });
  };
  const setInputValue = (value: string) => {
    let secondAmount = exchangeCurrency(
      parseFloat(value),
      second.currency,
      tokenData,
      first.currency
    );
    if (isNaN(secondAmount)) {
      secondAmount = 0;
    }
    const newValues = { ...values };
    newValues.second.amount = value;
    newValues.first.amount = secondAmount;
    setValues(newValues);
  };

  const BalanceString = useMemo(() => {
    return `Balance: ${
      second
        ? userWalletBalance
          ? userWalletBalance[second.currency].toFixed(2)
          : "-"
        : "0"
    }`;
  }, [userWalletBalance, second]);

  return (
    <>
      <div className="d-flex border-thin justify-content-between p-4 mt-2">
        <div className="d-flex flex-column align-items-start">
          <div className="text-lightest-gray mb-1">To</div>
          <NumberInput
            className={`text-left text-lg font-medium ${
              second && userWalletBalance ? "text-black" : "text-gray"
            }`}
            value={second ? second.amount : "0"}
            setValue={setInputValue}
          />
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="text-lightest-gray mb-1 font-medium">
            {BalanceString}
          </div>
          <div
            className="dropdown font-medium text-gray dropdown-title dropdown-title d-flex flex-row align-items-center pointer"
            onClick={onDropdownClick}
          >
            {second ? (
              <>
                <div className="mr-3 text-black">{second.currency}</div>
                <CurrencyIcon className="mr-3" currency={second.currency} />
                <img height={14} src={dropdown} />
              </>
            ) : (
              <div
                className="border-thin px-2 py-1 d-flex flex-row align-items-center"
                style={{ backgroundColor: "#8B7CF1", color: "white" }}
              >
                <div className="mr-3">Select a token</div>
                <img height={14} src={dropdownWhite} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UniswapBottomRow;
