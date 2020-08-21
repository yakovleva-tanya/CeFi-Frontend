import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import Form from "react-bootstrap/Form";
import FormValidationWarning from "../UI/FormValidationWarning";

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
    const split = value.split('.');
    if(split[1]&&split[1].length > 2){
      value = `${split[0]}.${split[1].substring(0,2)}`
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
    setValue((Math.trunc(100 * sliderValue * 1.5) / 100).toString());
  };

  return (
    <SubmenuCard
      title="Collateral Percent"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="-my-2 d-flex flex-column px-4">
        {warning ? (
          <FormValidationWarning message={warning} />
        ) : (
          <div style={{ height: "18px" }}>{""}</div>
        )}
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
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <Form>
          <Form.Group controlId="formBasicRangeCustom" className="mb-0 mt-4">
            <Form.Control
              type="range"
              custom
              onChange={onSliderChange}
              value={parseFloat(value) / 1.5}
            />
          </Form.Group>
        </Form>
        <div className="text-xs text-gray d-flex justify-content-between mb-2">
          <div>0%</div>
          <div>150%</div>
        </div>
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
