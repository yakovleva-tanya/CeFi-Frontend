import React, { useState } from "react";
import { Check } from "react-bootstrap-icons";
import LoadingAnimation from "../UI/LoadingAnimation";

type customSubmitProps = {
  onClickAction: Function;
  disabled?: boolean;
  loading?: boolean;
  approved: boolean;
  text: string;
};

export const CustomSubmitButton = ({
  onClickAction,
  disabled,
  loading,
  approved,
  text,
}: customSubmitProps) => {
  return (
    <div className="d-flex flex-row align-items-center">
      <div
        className={`py-1 px-3 border-thin  ${
          disabled ? "disabled text-lightest-gray" : "pointer text-black"
        }`}
        onClick={() => onClickAction()}
      >
        {text}
      </div>
      {loading ? (
        <LoadingAnimation isStopped={!loading} />
      ) : (
        <Check
          className={`${
            approved ? `text-green` : `text-lightest-gray`
          } text-lg ml-2`}
          size={24}
        />
      )}
    </div>
  );
};

type mockSubmitType = {
  text: string;
};

export const MockSubmitButton = ({ text }: mockSubmitType) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  function delay(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  const onClickAction = async () => {
    if (disabled) return;
    setLoading(true);
    await delay(1000);
    setApproved(true);
    setLoading(false);
    setDisabled(true);
  };
  return (
    <CustomSubmitButton
      onClickAction={() => {
        onClickAction();
      }}
      disabled={disabled}
      loading={loading}
      approved={approved}
      text={text}
    />
  );
};

