import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import infoTriangle from "../../../dist/assets/info-triangle.svg";
import Form from "react-bootstrap/Form";

const CollateralPercentSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(borrowRequest.collateralPercent);
  const [warning, setWarning] = useState("");
  const onChange = (e: any) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, "");
    value = Math.trunc(100 * parseFloat(value)) / 100;
    if (isNaN(value)) {
      value = "0.00";
    }
    e.target.value = value;
    if (value > 150 || value < 0) {
      setWarning("Please enter a number between 0-150");
    } else {
      setWarning("");
    }
    setValue(e.target.value);
  };
  const onSubmit = () => {
    if (value > 150) {
      setValue(150);
    }
    setValue(value);
    setBorrowRequest({
      ...borrowRequest,
      collateralPercent: value,
    });
    setSubmenu(null);
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
        />
        <Form>
          <Form.Group controlId="formBasicRangeCustom" className="mb-0 mt-4">
            <Form.Control
              type="range"
              custom
              onChange={(e: any) =>
                setValue(Math.trunc(100 * e.target.value * 1.5) / 100)
              }
              value={value / 1.5}
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

type validationProps = {
  message: string;
};

const FormValidationWarning = ({ message }: validationProps) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img className="mr-1" src={infoTriangle} height={14} />
      <div className="text-xs text-gray">{message}</div>
    </div>
  );
};
