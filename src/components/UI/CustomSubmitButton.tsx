import React, { useState } from "react";
import LoadingAnimation from "../UI/LoadingAnimation";
import greenCheck from "../../../dist/assets/check-green.svg";
import grayCheck from "../../../dist/assets/check-gray.svg";

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
    <div className="d-flex flex-row align-items-center font-medium">
      <div
        className={`py-1 px-3 mr-3 -my-2 border-thin font-medium ${
          disabled ? "disabled text-lightest-gray" : "pointer text-black"
        }`}
        onClick={() => onClickAction()}
      >
        {text}
      </div>
      {loading ? (
        <LoadingAnimation isStopped={!loading} />
      ) : (
        <img src={approved ? greenCheck : grayCheck} height={14} />
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
