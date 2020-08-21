import React from "react";
import infoTriangle from "../../../dist/assets/info-triangle.svg";

type validationProps = {
  message: string;
};

const FormValidationWarning = ({ message }: validationProps) => {
  return message ? (
    <div className="d-flex align-items-center justify-content-center">
      <img className="mr-1" src={infoTriangle} height={14} />
      <div className="text-xs text-gray">{message}</div>
    </div>
  ) : (
    <div style={{ height: "18px" }}>{""}</div>
  );
};

export default FormValidationWarning;
