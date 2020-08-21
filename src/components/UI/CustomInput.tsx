import React, { useState } from "react";

type customInputProps = {
  value: string;
  onChangeFunction: Function;
  type?: string;
  onBlur?: Function;
};
const CustomInput = ({
  value,
  onChangeFunction,
  type,
  onBlur = () => {},
}: customInputProps) => {
  return (
    <input
      type={type}
      className="input text-5xl font-medium text-black"
      value={value}
      name="amount"
      onChange={(e: any) => {
        onChangeFunction(e);
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onBlur(e);
        }
      }}
      onBlur={(e: any) => {
        onBlur(e);
      }}
    />
  );
};

export const MockCustomInput = () => {
  const [value, setValue] = useState(0);
  return (
    <CustomInput
      onChangeFunction={(e: any) => {
        setValue(e.target.value);
      }}
      value={value.toString()}
    />
  );
};
export default CustomInput;
