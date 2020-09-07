import React from "react";

type numberInputProps = {
  value: string;
  setValue: Function;
  decimals?: number;
  className?: string;
};

export const numberInputEnforcer = (value: string, decimals: number = 4) => {
  const escapeRegExp = (string: string): string => {
    return string.replace(/[,.*+?^${}()|[\]\\]/g, "\\$&");
  };
  const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d{0,${decimals}}$`);

  if (value === "" || inputRegex.test(escapeRegExp(value))) {
    return true;
  }
};

export const onBlurFormat = (value: string) => {
  let newValue = parseFloat(value);
  if (isNaN(newValue)) {
    newValue = 0;
  }
  return newValue.toFixed(2);
};

const NumberInput = ({
  value,
  setValue,
  decimals = 4,
  className = "",
}: numberInputProps) => {
  return (
    <input
      className={`input ${className}`}
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        if (numberInputEnforcer(value, decimals)) {
          setValue(value);
        }
      }}
      onBlur={(e) => {
        setValue(onBlurFormat(e.target.value));
      }}
      inputMode="decimal"
      title="Token Amount"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      maxLength={49}
      spellCheck="false"
    />
  );
};

export default NumberInput;
