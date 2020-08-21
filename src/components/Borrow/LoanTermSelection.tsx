import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import FormValidationWarning from "../UI/FormValidationWarning";
import CustomSlider from "../UI/CustomSlider";

const LoanTermSubmenu = () => {
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
    if (value > max) {
      setValue(max);
    }
    if (value < min) {
      setValue(min);
    }
    setBorrowRequest({
      ...borrowRequest,
      loanTerm: value,
    });
    setSubmenu(null);
  };
  const onSliderChange = (e: any) => {
    const value = Math.floor((e.target.value * max / 100)) + min;
    if (value > max || value < min) {
      setWarning(errorMessage);
    } else {
      setWarning("");
    }
    setValue(value);
  };

  return (
    <SubmenuCard
      title="Collateral Percent"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="-my-2 d-flex flex-column px-4">
        <FormValidationWarning message={warning} />
        <input
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
          Submit
        </div>
      </div>
    </SubmenuCard>
  );
};

const LoanTermSelection = () => {
  const { borrowRequest, setSubmenu } = useContext(BorrowPageContext);

  return (
    <CustomSubmenuLink
      title={`${borrowRequest.loanTerm} DAYS`}
      onClickAction={() => {
        setSubmenu(<LoanTermSubmenu />);
      }}
    />
  );
};

export default LoanTermSelection;
