import React, { useContext } from "react";
import CustomInput from "../UI/CustomInput";
import { LendPageContext } from "../../context/LendContext";

const convertCurrency = (currency: number, amount: number) =>
  (amount / currency).toFixed(2);

type lendAmountProps = {
  amount: number;
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
        onChangeFunction={(e:any) => {
          e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          handleChange(e);
          setSelectedAmount(parseFloat(e.target.value) || 0);
        }}
        value={`$${amount}`}
      />
      <div className="text-lightest-gray text-lg">{`${convertCurrency(
        exchangeRates[selectedCurrency],
        selectedAmount
      )} ${selectedCurrency}`}</div>
    </div>
  );
};

export default LendAmountInput;
