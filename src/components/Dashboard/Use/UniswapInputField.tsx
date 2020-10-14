import React, { useContext, useMemo } from "react";

import NumberInput from "../../UI/NumberInput";
import CurrencyIcon from "../../UI/CurrencyIcon";
import dropdown from "../../../../dist/assets/arrow-down.svg";

import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/uniswapContext";

const UniswapInputField = () => {
  const { state } = useContext(AppContext);
  const { teller } = state;
  const { userWalletBalance } = teller;
  const {
    options,
    setTokenSelectionDropdown,
    isExactIn,
    setIsExactIn,
    trade,
    values,
    setValues,
  } = useContext(UniswapContext);
  const input = values.input;
  const { amount, token } = input;
  const balanceString = useMemo(() => {
    return `Balance: ${
      userWalletBalance ? userWalletBalance[token].toFixed(2) : "-"
    }`;
  }, [userWalletBalance, input.token]);

  const getInputValue = () => {
    return isExactIn ? amount : trade ? trade.inputAmount.toSignificant(4) : 0;
  };
  const inputValue = useMemo(() => {
    return getInputValue();
  }, [isExactIn, values, trade]);

  const onDropdownClick = () => {
    setTokenSelectionDropdown({
      tokens: values.output.token
        ? options.filter((option: any) => {
            return option != values.output.token;
          })
        : options,
      type: "First",
    });
  };

  return (
    <>
      <div className="d-flex border-thin justify-content-between p-4 mt-3">
        <div className="d-flex flex-grow flex-column align-items-start">
          <div className="text-lightest-gray mb-1">
            From {trade && !isExactIn && " (estimated)"}
          </div>
          <NumberInput
            style={{ width:'100%' }}
            className={`text-left text-lg font-medium  ${
              values.output.token && userWalletBalance
                ? "text-black"
                : "text-gray"
            }`}
            value={inputValue}
            setValue={(e: any) => {
              if (!isExactIn) {
                setIsExactIn(true);
              }
              const newValues = { ...values };
              newValues.input.amount = e;
              setValues(newValues);
            }}
          />
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="text-lightest-gray mb-1 font-medium">
            {balanceString}
          </div>
          <div className="d-flex flex-row align-items-center">
            {Math.round(amount) !== Math.round(userWalletBalance[token]) && (
              <div
                className="mr-4 py-1 px-2 border-thin text-lightest-gray pointer"
                onClick={() => {
                  const newValues = { ...values };
                  newValues.input.amount = userWalletBalance[token];
                  setValues(newValues);
                }}
              >
                Max
              </div>
            )}
            <div
              className="dropdown font-medium text-gray dropdown-title dropdown-title d-flex flex-row align-items-center pointer"
              onClick={onDropdownClick}
            >
              <div className="mr-3 text-black">{token}</div>
              <CurrencyIcon className="mr-3" currency={token} />
              <img height={14} src={dropdown} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniswapInputField;
