import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import FormValidationWarning from "../UI/FormValidationWarning";
import CustomSlider from "../UI/CustomSlider";

export const LoanTermSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(borrowRequest.loanTerm);
  const [warning, setWarning] = useState("");

  const min = 1;
  const max = 90;
  const sliderValue = (100 / (max - min + 1)) * value;
  const errorMessage = `Please enter a number between ${min}-${max}`;

  const onChange = (e: any) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (isNaN(value)) {
      value = "0";
    }
    if (value > max || value < min) {
      setWarning(errorMessage);
    } else {
      setWarning("");
    }
    setValue(value);
  };
  const onSubmit = () => {
    let newValue = value;
    if (value > max) {
      newValue = max;
    }
    if (value < min) {
      newValue = min;
    }
    setBorrowRequest({
      ...borrowRequest,
      loanTerm: newValue,
    });
    setSubmenu(null);
  };
  const onSliderChange = (e: any) => {
    const value = Math.floor((e.target.value * max) / 100) + min;
    if (value > max || value < min) {
      setWarning(errorMessage);
    } else {
      setWarning("");
    }
    setValue(value);
  };

  return (
    <SubmenuCard
      title="Loan term"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="-my-2 d-flex flex-column px-4">
        <div className="mb-4">Enter in the duration of your loan term </div>
        <input
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="input text-5xl font-medium text-black text-center"
          value={value}
          name="amount"
          onChange={onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
        <div className="text-lg text-gray">
          {value % 10 === 1 ? "day" : "days"}
        </div>
        <CustomSlider
          min={`${min} day`}
          max={`${max} days`}
          onChange={onSliderChange}
          value={sliderValue}
        />
        <div
          className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
          onClick={onSubmit}
        >
          Enter
        </div>
        <FormValidationWarning message={warning} />
      </div>
    </SubmenuCard>
  );
};

const LoanTermSelection = () => {
  const { borrowRequest, setSubmenu } = useContext(BorrowPageContext);

  return (
    <CustomSubmenuLink
      title={`${borrowRequest.loanTerm} ${
        borrowRequest.loanTerm % 10 == 1 ? "day" : "days"
      }`}
      onClickAction={() => {
        setSubmenu("LoanTerm");
      }}
    />
  );
};

export default LoanTermSelection;
