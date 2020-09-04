import React from "react";
import Arrow from "../UI/Arrow";

type customSubmenuLinkProps = {
  title: string;
  onClickAction: Function;
};
const CustomSubmenuLink = ({
  title,
  onClickAction,
}: customSubmenuLinkProps) => {
  return (
    <div
      onClick={() => {
        onClickAction();
      }}
      className="d-flex flex-row align-items-center pointer"
    >
      <div className="mr-3 font-medium">{title}</div>
      <Arrow direction='right'/>
    </div>
  );
};
export default CustomSubmenuLink;
