import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import FormValidationWarning from "../UI/FormValidationWarning";
import CustomSlider from "../UI/CustomSlider";

const CollateralPercentSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(`${borrowRequest.collateralPercent}%`);
  const [warning, setWarning] = useState("");

  const onBlur = () => {
    setValue(`${value || 0}%`);
  };
  const onFocus = () => {
    setValue(`${value.replace(/[^0-9.]/g, "")}`);
  };
  const onChange = (e: any) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, "");
    const split = value.split(".");
    if (split[1] && split[1].length > 2) {
      value = `${split[0]}.${split[1].substring(0, 2)}`;
    }
    if (isNaN(value)) {
      value = "0.00";
    }
    if (value > 150 || value < 0) {
      setWarning("Please enter a number between 0-150");
    } else {
      setWarning("");
    }
    setValue(value);
  };
  const onSubmit = () => {
    let valueNum = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (valueNum > 150) {
      valueNum = 150;
    }
    setBorrowRequest({
      ...borrowRequest,
      collateralPercent: valueNum,
    });
    setSubmenu(null);
  };
  const onSliderChange = (e: any) => {
    const sliderValue = e.target.value;
    if (sliderValue > 150 || sliderValue < 0) {
      setWarning("Please enter a number between 0-150");
    } else {
      setWarning("");
    }
    setValue(`${(Math.trunc(100 * sliderValue * 1.5) / 100).toString()}%`);
  };

  return (
    <SubmenuCard
      title="Collateral percent"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="-my-2 d-flex flex-column px-4">
        <FormValidationWarning message={warning} />
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
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <CustomSlider
          min="0%"
          max="150%"
          onChange={onSliderChange}
          value={parseFloat(value) / 1.5}
        />
        <div
          className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
          onClick={onSubmit}
        >
          Enter
        </div>
      </div>
    </SubmenuCard>
  );
};

const CollateralPercentSelection = () => {
  const { borrowRequest, setSubmenu } = useContext(BorrowPageContext);

  return (
    <CustomSubmenuLink
      title={`${borrowRequest.collateralPercent}%`}
      onClickAction={() => {
        setSubmenu(<CollateralPercentSubmenu />);
      }}
    />
  );
};
export default CollateralPercentSelection;
