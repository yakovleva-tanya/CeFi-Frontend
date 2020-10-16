import React, { useState, useContext, useEffect, useMemo } from "react";
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
import copy from "../../../copy.json";

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
  const tokenData = state.tokenData;
  const primaryAddress = state.web3State?.address;
  const contracts = state.teller?.contracts || null;
  const [selectedAmount, setSelectedAmount] = useState("0.00");

  const convertFromUSD = (value: number) => {
    return tokenData
      ? Math.round(
          parseFloat(tokenData[selectedCurrency].price) * value * 100
        ) / 100
      : value;
  };

  const clearSigns = (value: string) => value.replace(/[^0-9.]/g, "");

  const onSubmitMock = async () => {
    setWithdrawing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setWithdrawing(false);
    setSuccess(true);
  };
  const onSubmit = async (selectedCurrency: string, selectedAmount: string) => {
    try {
      setWithdrawing(true);
      const value = `${convertFromUSD(parseFloat(selectedAmount))}`;
      await withdraw({
        selectedCurrency,
        selectedAmount: value,
        primaryAddress,
        updateAppState,
        contracts,
      } as WithdrawRequest);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      updateAppState((st: AppContextState) => {
        const errorModal = {
          show: true,
          message:
            "An error occurred during the withdrawal process. Please try again.",
          title: "Error",
        };
        return { ...st, errorModal };
      });
      setSuccess(false);
    } finally {
      setWithdrawing(false);
    }
  };

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

  const maxValue = useMemo(
    () =>
      contracts[BaseTokens.ETH][
        mapLendingTokensToTellerTokens(selectedCurrency)
      ].suppliedBalance,
    [selectedCurrency]
  );

  useEffect(() => {
    if (parseFloat(selectedAmount) > maxValue) {
      setWarningMessage(`Please input amount smaller than ${maxValue}`);
    } else {
      setWarningMessage("");
    }
  }, [selectedCurrency, selectedAmount]);

  const { description, form, CTA } = copy.pages.dashboard["deposit-withdraw"];
  return (
    <div className="my-2">
      <div className="text-gray mb-2">{description}</div>
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
          let value = maxValue;
          if (isNaN(value)) {
            value = 0;
          }
          setSelectedAmount(value.toFixed(2));
        }}
      >
        Max
      </div>
      <div className="table border-thin my-4">
        <TableRow title={form.withdrawWithTitle}>
          <CustomDropdown
            selected={selectedCurrency}
            options={[AvailableLendingTokens.DAI, AvailableLendingTokens.USDC]}
            handleSelect={setSelectedCurrency}
          />
        </TableRow>
      </div>
      <PrimaryButton
        text={CTA}
        onClick={() => {
          process.env.INTEGRATIONS_DISABLED === "true"
            ? onSubmitMock()
            : onSubmit(
                selectedCurrency,
                selectedAmount.replace(/[^0-9.]/g, "")
              );
        }}
      />
    </div>
  );
};

export default WithdrawMainSection;
