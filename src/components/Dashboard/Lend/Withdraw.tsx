import React, { useState, useContext } from "react";
import PrimaryButton from "../../UI/PrimaryButton";
import { CustomDropdown } from "../../UI/CustomDropdown";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import TableRow from "../../UI/TableRow";
import CustomInput from "../../UI/CustomInput";
import FormValidationWarning from "../../UI/FormValidationWarning";

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

const Withdraw = () => {
  const { state, updateAppState } = useContext(AppContext);
  const tokenData = state.tokenData;
  const primaryAddress = state.web3State?.address;
  const contracts = state.teller.contracts;
  const [isWithdrawing, setWithdrawing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    AvailableLendingTokens
  >(AvailableLendingTokens.DAI);
  const [selectedAmount, setSelectedAmount] = useState("0.00");
  const [warningMessage, setWarningMessage] = useState("");

  const convertFromUSD = (value: number) => {
    return tokenData
      ? Math.round(
          parseFloat(tokenData[selectedCurrency].price) * value * 10000
        ) / 10000
      : value;
  };

  const clearSigns = (value: string) => value.replace(/[^0-9.]/g, "");

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
          10000
      ) / 10000
    : 0;

  const price = tokenData ? `${priceValue} ${selectedCurrency}` : "-";

  const tellerTokens = mapLendingTokensToTellerTokens(selectedCurrency);

  const userBalance = convertFromUSD(
    contracts[BaseTokens.ETH][tellerTokens].suppliedBalance
  );

  const maxValue = `${userBalance}`;

  return (
    <div>
      {success && (
        <SuccessScreen
          fullScreen={false}
          onButtonClick={() => {
            setSuccess(false);
          }}
          title="You're set!"
          message={
            <div>
              View your{" "}
              <a target="_blank" rel="noreferrer" href="">
                withdraw transaction.
              </a>
            </div>
          }
        />
      )}
      {isWithdrawing && (
        <ProcessingScreen link="" title="Withdrawing" fullScreen={false} />
      )}
      {!isWithdrawing && !success && (
        <div>
          <FormValidationWarning message={warningMessage} />
          <CustomInput
            onChangeFunction={(e: any) => {
              let value = e.target.value.replace(/[^0-9.]/g, "");
              const split = value.split(".");
              if (split[1] && split[1].length > 2) {
                value = `${split[0]}.${split[1].substring(0, 2)}`;
              }
              if (
                parseFloat(value) > parseFloat(maxValue.replace(/[^0-9.]/g, ""))
              ) {
                setWarningMessage(
                  `Please input amount smaller than ${maxValue}`
                );
              } else {
                setWarningMessage("");
              }
              if (isNaN(value)) {
                value = "0.00";
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
              setSelectedAmount(maxValue);
            }}
          >
            Max
          </div>
          <div className="table border-thin my-5">
            <TableRow title="Withdraw With">
              <CustomDropdown
                selected={selectedCurrency}
                options={[
                  AvailableLendingTokens.DAI,
                  AvailableLendingTokens.USDC,
                ]}
                handleSelect={setSelectedCurrency}
              />
            </TableRow>
          </div>
          <PrimaryButton
            text="Withdraw"
            onClick={() => {
              onSubmit(
                selectedCurrency,
                selectedAmount.replace(/[^0-9.]/g, "")
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Withdraw;
