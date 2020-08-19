import React, { useContext } from "react";
import CustomInput from "../UI/CustomInput";
import { LendPageContext } from "../../context/lendContext";
import { AppContext } from "../../context/app";

const convertCurrency = (currency: number, amount: number) =>
  (Math.round((amount / currency) * 100) / 100).toFixed(2);

type lendAmountProps = {
  amount: string;
  handleChange: Function;
};

const LendAmountInput = ({ amount, handleChange }: lendAmountProps) => {
  const { selectedCurrency, selectedAmount, setSelectedAmount } = useContext(
    LendPageContext
  );
  const { state } = useContext(AppContext);
  const tokenData = state.tokenData;
  const convertedAmount = tokenData
    ? `${convertCurrency(
        tokenData[selectedCurrency].price,
        selectedAmount
      )} ${selectedCurrency}`
    : "-";
  const onBlur = (e: any) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    if (e.target.value.length < 1) {
      e.target.value = 0;
    }
    e.target.value = parseFloat(e.target.value).toFixed(2);
    setSelectedAmount(e.target.value);
    handleChange(e);
  };
  const value = `$${amount.toString().replace(/[^0-9.]/g, "")}`;

  return (
    <div className="mt-5">
      <CustomInput
        onChangeFunction={(e: any) => {
          handleChange(e);
        }}
        value={value}
        onBlur={onBlur}
      />
      <div className="text-lightest-gray text-lg">{convertedAmount}</div>
    </div>
  );
};

export default LendAmountInput;
