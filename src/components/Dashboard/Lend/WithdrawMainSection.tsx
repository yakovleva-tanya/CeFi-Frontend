import React, { useState, useContext, useEffect } from "react";
import PrimaryButton from "../../UI/PrimaryButton";
import { CustomDropdown } from "../../UI/CustomDropdown";
import TableRow from "../../UI/TableRow";
import CustomInput from "../../UI/CustomInput";
import FormValidationWarning from "../../UI/FormValidationWarning";
import { LendWithdrawContext } from "../../../context/dashboardContext";

import {
  AppContext,
  AppContextState,
  AvailableLendingTokens,
  mapLendingTokensToTellerTokens,
  BaseTokens,
} from "../../../context/app";
import {
  withdraw,
  WithdrawRequest,
} from "../../../actions/DashboardLendActions";

const WithdrawMainSection = () => {
  const {
    selectedCurrency,
    setSelectedCurrency,
    setWithdrawing,
    setSuccess,
    warningMessage,
    setWarningMessage,
  } = useContext(LendWithdrawContext);

  const { state, updateAppState } = useContext(AppContext);
  const { tokenData, demoData } = state;
  //const primaryAddress = state.web3State?.address;
  //const contracts = state.teller.contracts;
  const [selectedAmount, setSelectedAmount] = useState("0.00");

  const convertFromUSD = (value: number) => {
    return tokenData
      ? Math.round(
          parseFloat(tokenData[selectedCurrency].price) * value * 100
        ) / 100
      : value;
  };

  const clearSigns = (value: string) => value.replace(/[^0-9.]/g, "");

  const priceValue = tokenData
    ? Math.round(
        (parseFloat(clearSigns(selectedAmount)) /
          tokenData[selectedCurrency].price) *
          100
      ) / 100
    : 0;

  const price = tokenData
    ? `${isNaN(priceValue) ? 0 : priceValue} ${selectedCurrency}`
    : "-";

  const maxValue = {
    USDC: isNaN(convertFromUSD(demoData.deposits["USDC"]))
      ? 0
      : convertFromUSD(demoData.deposits["USDC"]),
    DAI: isNaN(convertFromUSD(demoData.deposits["DAI"]))
      ? 0
      : convertFromUSD(demoData.deposits["DAI"]),
  };

  useEffect(() => {
    if (parseFloat(selectedAmount) > maxValue[selectedCurrency]) {
      setWarningMessage(
        `Please input amount smaller than ${maxValue[selectedCurrency]}`
      );
    } else {
      setWarningMessage("");
    }
  }, [selectedCurrency, selectedAmount]);

  return (
    <div className="my-2">
      <div className="text-gray mb-2">
        Select an asset to withdraw your deposit to date
      </div>
      <FormValidationWarning message={warningMessage} />
      <CustomInput
        onChangeFunction={(e: any) => {
          let value = e.target.value.replace(/[^0-9.]/g, "");
          const split = value.split(".");
          if (split[1] && split[1].length > 2) {
            value = `${split[0]}.${split[1].substring(0, 2)}`;
          }
          setSelectedAmount(value);
        }}
        value={`$${selectedAmount.toString()}`}
        type="string"
        onBlur={(e: any) => {
          let value = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
          if (isNaN(value)) {
            value = 0;
          }
          setSelectedAmount(`${value.toFixed(2)}`);
        }}
      />
      <div className="text-lightest-gray text-lg ">{price}</div>
      <div
        className="mx-auto py-1 px-3 my-4 border-thin pointer text-black"
        style={{ width: "85px" }}
        onClick={() => {
          let value = maxValue[selectedCurrency];
          if (isNaN(value)) {
            value = 0;
          }
          setSelectedAmount(value.toFixed(2));
        }}
      >
        Max
      </div>
      <div className="table border-thin my-4">
        <TableRow title="Withdraw With">
          <CustomDropdown
            selected={selectedCurrency}
            options={[AvailableLendingTokens.DAI, AvailableLendingTokens.USDC]}
            handleSelect={setSelectedCurrency}
          />
        </TableRow>
      </div>
      <PrimaryButton
        text="Withdraw"
        onClick={async () => {
          setWithdrawing(true);
          updateAppState((st: AppContextState) => {
            const deposits = st.demoData.deposits;
            deposits[selectedCurrency] -= parseFloat(price);
            const walletBalances = st.demoData.walletBalances;
            walletBalances[selectedCurrency] += parseFloat(price);
            const demoData = { ...st.demoData, walletBalances, deposits };
            return { ...st, demoData };
          });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setWithdrawing(false);
          setSuccess(true);
        }}
      />
    </div>
  );
};

export default WithdrawMainSection;
