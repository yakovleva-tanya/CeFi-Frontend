import React, { useState, useContext } from "react";
import PrimaryButton from "../../UI/PrimaryButton";
import { CustomDropdown } from "../../UI/CustomDropdown";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import { withdraw } from "../../../actions/DashboardLendActions";
import TableRow from "../../UI/TableRow";
import CustomInput from "../../UI/CustomInput";
import { AppContext } from "../../../context/app";
import FormValidationWarning from "../../UI/FormValidationWarning";

const Withdraw = () => {
  const { state } = useContext(AppContext);
  const tokenData = state.tokenData;
  const [isWithdrawing, setWithdrawing] = useState(false);
  const [success, setSuccess] = useState(false);
  const currencies = ["DAI", "USDC"];
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedAmount, setSelectedAmount] = useState("$0.00");
  const [warningMessage, setWarningMessage] = useState("");

  const onSubmit = async (selectedCurrency: string, selectedAmount: number) => {
    setWithdrawing(true);
    const res = await withdraw(selectedCurrency, selectedAmount);
    setWithdrawing(false);
    setSuccess(res);
  };

  const maxValue = "$1000.00";
  // TODO connect user balance

  const price = tokenData
    ? `${
        Math.round(
          (parseFloat(selectedAmount.replace(/[^0-9.]/g, "")) /
            tokenData[selectedCurrency].price) *
            10000
        ) / 10000
      } ${selectedCurrency}`
    : "-";

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
            value={`${selectedAmount.toString()}`}
            type="string"
            onBlur={(e: any) => {
              let value = parseFloat(e.target.value);
              if (isNaN(value)) {
                value = 0;
              }
              setSelectedAmount(`$${value.toFixed(2)}`);
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
                options={currencies}
                handleSelect={(currency: string) => {
                  setSelectedCurrency(currency);
                }}
              />
            </TableRow>
          </div>
          <PrimaryButton
            text="Withdraw"
            onClick={() => {
              onSubmit(
                selectedCurrency,
                parseFloat(selectedAmount.replace(/[^0-9.]/g, ""))
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Withdraw;
