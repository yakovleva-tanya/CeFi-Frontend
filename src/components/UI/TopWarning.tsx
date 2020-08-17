import React from "react";
import "./top-warning.scss";

type warningProps = {
  text: string;
};
const TopWarning = ({ text }: warningProps) => {
  return <div className="top-warning">{text}</div>;
};

export default TopWarning;
