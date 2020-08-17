import React, { useContext } from "react";
import CustomInput from "../UI/CustomInput";
import { LendPageContext } from "../../context/lendContext";

const convertCurrency = (currency: number, amount: number) =>
  (amount / currency).toFixed(2);

type lendAmountProps = {
  amount: string;
  handleChange: Function;
};

const LendAmountInput = ({ amount, handleChange }: lendAmountProps) => {
  const {
    selectedCurrency,
    selectedAmount,
    setSelectedAmount,
    exchangeRates,
  } = useContext(LendPageContext);
  return (
    <div className="mt-5">
      <CustomInput
        onChangeFunction={(e: any) => {
          handleChange(e);
        }}
        value={`$${amount.toString().replace(/[^0-9.]/g, "")}`}
        onBlur={(e: any) => {
          e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          if (e.target.value.length < 1) {
            e.target.value = 0;
          }
          e.target.value = parseFloat(e.target.value).toFixed(2);
          setSelectedAmount(e.target.value);
          handleChange(e);
        }}
      />
      <div className="text-lightest-gray text-lg">{`${convertCurrency(
        exchangeRates[selectedCurrency],
        selectedAmount
      )} ${selectedCurrency}`}</div>
    </div>
  );
};

export default LendAmountInput;
