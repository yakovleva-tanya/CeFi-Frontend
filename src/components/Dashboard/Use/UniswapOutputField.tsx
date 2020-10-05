import React, { useContext, useMemo } from "react";
import NumberInput from "../../UI/NumberInput";
import { AppContext } from "../../../context/app";
import { UniswapContext } from "../../../context/uniswapContext";
import CurrencyIcon from "../../UI/CurrencyIcon";
import dropdownWhite from "../../../../dist/assets/arrow-down-white.svg";
import dropdown from "../../../../dist/assets/arrow-down.svg";

const UniswapOutputField = () => {
  const { state } = useContext(AppContext);
  const { teller } = state;
  const { userWalletBalance } = teller;
  const {
    values,
    options,
    setTokenSelectionDropdown,
    isExactIn,
    setIsExactIn,
    setValues,
    trade,
  } = useContext(UniswapContext);
  const { input, output } = values;

  const onDropdownClick = () => {
    setTokenSelectionDropdown({
      tokens: options.filter((option: any) => {
        return option != input.token;
      }),
      type: "Second",
    });
  };

  const BalanceString = useMemo(() => {
    return `Balance: ${
      output.token
        ? userWalletBalance
          ? userWalletBalance[output.token].toFixed(2)
          : "-"
        : "0"
    }`;
  }, [userWalletBalance, output.token]);

  return (
    <>
      <div className="d-flex border-thin justify-content-between p-4 mt-2">
        <div className="d-flex flex-column align-items-start">
          <div className="text-lightest-gray mb-1">
            To {trade && isExactIn && "(estimated)"}
          </div>
          <div
            className={`text-left text-lg font-medium ${
              output.token && userWalletBalance ? "text-black" : "text-gray"
            }`}
            style={{ cursor: "default" }}
          >
            {isExactIn
              ? trade
                ? trade.outputAmount.toSignificant(4)
                : "0"
              : output.amount || "0"}
          </div>
          {/* <NumberInput
            className={`text-left text-lg font-medium ${
              output.token && userWalletBalance ? "text-black" : "text-gray"
            }`}
            value={
              isExactIn
                ? trade
                  ? trade.outputAmount.toSignificant(4)
                  : "0"
                : output.amount || "0"
            }
            setValue={(e: any) => {
              if (isExactIn) {
                setIsExactIn(false);
              }
              const newValues = { ...values };
              newValues.output.amount = e;
              setValues(newValues);
            }}
          /> */}
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="text-lightest-gray mb-1 font-medium">
            {BalanceString}
          </div>
          <div
            className="dropdown font-medium text-gray dropdown-title dropdown-title d-flex flex-row align-items-center pointer"
            onClick={onDropdownClick}
          >
            {output.token ? (
              <>
                <div className="mr-3 text-black">{output.token}</div>
                <CurrencyIcon className="mr-3" currency={output.token} />
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

export default UniswapOutputField;
