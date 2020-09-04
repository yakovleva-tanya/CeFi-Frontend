import React from "react";
import Button from "react-bootstrap/Button";

type primaryButtonProps = {
  text: string;
  onClick?: Function;
  disabled?: boolean;
  type?: string;
  variant?: string;
};
const PrimaryButton = ({
  text,
  onClick = () => {},
  disabled = false,
  type = "",
  variant = "primary",
}: primaryButtonProps) => {
  return (
    <Button
      style={{minWidth:'152px'}}
      type={type}
      variant={variant}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
      className={`py-3 px-4 text-lg mt-4 font-medium ${
        disabled ? "disabled" : "pointer"
      }`}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
