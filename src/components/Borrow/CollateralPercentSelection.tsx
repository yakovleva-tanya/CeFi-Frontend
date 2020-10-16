import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import FormValidationWarning from "../UI/FormValidationWarning";
import CustomSlider from "../UI/CustomSlider";
import copy from "../../copy.json";

export const CollateralPercentSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(`${borrowRequest.collateralPercent}%`);
  const [warning, setWarning] = useState("");
  const {
    inputRangeWarning,
    title,
    description,
  } = copy.pages.borrow.main.form.step2.collateralPercent.submenu;
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
      setWarning(inputRangeWarning);
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
      setWarning(inputRangeWarning);
    } else {
      setWarning("");
    }
    setValue(`${(Math.trunc(100 * sliderValue * 1.5) / 100).toString()}%`);
  };

  return (
    <SubmenuCard
      title={title}
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="-my-2 d-flex flex-column px-4">
        <div className="mb-4">{description}</div>
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
        <FormValidationWarning message={warning} />
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
        setSubmenu("CollateralPercent");
      }}
    />
  );
};
export default CollateralPercentSelection;
