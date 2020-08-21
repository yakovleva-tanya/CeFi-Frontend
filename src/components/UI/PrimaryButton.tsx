import React from "react";
import Button from "react-bootstrap/Button";

type primaryButtonProps = {
  text: string;
  onClick?: Function;
  disabled?: boolean;
  type?: string;
};
const PrimaryButton = ({
  text,
  onClick = () => {},
  disabled = false,
  type = "",
}: primaryButtonProps) => {
  return (
    <Button
      type={type}
      variant="primary"
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
      className={`py-3 px-4 text-lg mt-4 ${
        disabled ? "disabled" : "pointer"
      }`}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
