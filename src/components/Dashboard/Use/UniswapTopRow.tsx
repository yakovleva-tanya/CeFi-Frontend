import React, { useContext, useMemo } from "react";

import NumberInput from "../../UI/NumberInput";
import { exchangeCurrency } from "../../../actions/HelperFunctions";
import CurrencyIcon from "../../UI/CurrencyIcon";
import dropdown from "../../../../dist/assets/arrow-down.svg";

import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/dashboardContext";

const UniswapTopRow = () => {
  const { state } = useContext(AppContext);
  const { tokenData, teller } = state;
  const { userWalletBalance } = teller;
  const { values, setValues, options, setTokenSelectionDropdown } = useContext(
    UniswapContext
  );
  const { first, second } = values;

  const setInputValue = (value: string) => {
    if (!second) {
      const newValues = { ...values };
      newValues.first.amount = value;
      setValues(newValues);
    } else {
      let secondAmount = exchangeCurrency(
        parseFloat(value),
        first.currency,
        tokenData,
        second.currency
      );
      if (isNaN(secondAmount)) {
        secondAmount = 0;
      }
      const newValues = { ...values };
      newValues.first.amount = value;
      newValues.second.amount = secondAmount;
      setValues(newValues);
    }
  };
  const balanceString = useMemo(() => {
    return `Balance: ${
      userWalletBalance ? userWalletBalance[first.currency].toFixed(2) : "-"
    }`;
  }, [userWalletBalance, first.currency]);

  const onMaxClick = () => {
    const newValues = { ...values };
    (newValues.first.amount = userWalletBalance[first.currency]),
      setValues(newValues);
  };
  const onDropdownClick = () => {
    setTokenSelectionDropdown({
      tokens: second
        ? options.filter((option) => {
            return option != second.currency;
          })
        : options,
      type: "First",
    });
  };

  return (
    <>
      <div className="d-flex border-thin justify-content-between p-4 mt-3">
        <div className="d-flex flex-column align-items-start">
          <div className="text-lightest-gray mb-1">From</div>
          <NumberInput
            className={`text-left text-lg font-medium  ${
              second && userWalletBalance ? "text-black" : "text-gray"
            }`}
            value={first.amount}
            setValue={setInputValue}
          />
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="text-lightest-gray mb-1 font-medium">
            {balanceString}
          </div>
          <div className="d-flex flex-row align-items-center">
            {Math.round(first.amount) !==
              Math.round(userWalletBalance[first.currency]) && (
              <div
                className="mr-4 py-1 px-2 border-thin text-lightest-gray pointer"
                onClick={onMaxClick}
              >
                Max
              </div>
            )}
            <div
              className="dropdown font-medium text-gray dropdown-title dropdown-title d-flex flex-row align-items-center pointer"
              onClick={onDropdownClick}
            >
              <div className="mr-3 text-black">{first.currency}</div>
              <CurrencyIcon className="mr-3" currency={first.currency} />
              <img height={14} src={dropdown} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniswapTopRow;
