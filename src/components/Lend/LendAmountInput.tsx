import React, { useContext } from "react";
import { AppContext, AppContextState } from "../../context/app";
import CustomInput from "../UI/CustomInput";

const convertCurrency = (currency: number, amount: number) =>
  (amount / currency).toFixed(2);

type lendAmountProps = {
  amount: number;
  handleChange: Function;
};

const LendAmountInput = ({ amount, handleChange }: lendAmountProps) => {
  const { state, updateAppState } = useContext(AppContext);
  const { selectedAmount, selectedCurrency } = state.lendPage;
  const exchangeRates = state.exchangeRates;

  const setAmount = (selectedAmount: number) => {
    updateAppState((st: AppContextState) => {
      const lendPage = st.lendPage;
      lendPage.selectedAmount = selectedAmount;
      return { ...st, lendPage };
    });
  };

  return (
    <div className="mt-5">
      <CustomInput
        onChangeFunction={(e:any) => {
          e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          handleChange(e);
          setAmount(parseFloat(e.target.value) || 0);
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
