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
  const walletBalances = state.demoData.walletBalances;
  const tokenData = state.tokenData;
  const convertedAmount = tokenData
    ? `${convertCurrency(
        tokenData[selectedCurrency].price,
        selectedAmount
      )} ${selectedCurrency}`
    : "-";

  const convertInputAmount = (value: any) => {
    value = value.replace(/[^0-9.]/g, "");
    value = parseFloat(value).toFixed(2);
    if (isNaN(value)) {
      value = "0.00";
    }
    return value;
  };
  const onBlur = (e: any) => {
    e.target.value = convertInputAmount(e.target.value);
    if (e.target.value > walletBalances[selectedCurrency]) {
      e.target.value = walletBalances[selectedCurrency];
    }
    handleChange(e);
    setSelectedAmount(e.target.value);
  };
  const onChange = (e: any) => {
    handleChange(e);
    const value = convertInputAmount(e.target.value);
    setSelectedAmount(value);
  };

  const value = `$${amount.toString().replace(/[^0-9.]/g, "")}`;

  return (
    <div className="">
      <CustomInput onChangeFunction={onChange} value={value} onBlur={onBlur} />
      <div className="text-lightest-gray text-lg font-medium">{convertedAmount}</div>
    </div>
  );
};

export default LendAmountInput;
