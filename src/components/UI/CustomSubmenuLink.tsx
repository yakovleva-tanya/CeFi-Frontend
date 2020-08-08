import React from "react";

import { ChevronRight } from "react-bootstrap-icons";

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
      className="d-flex flex-row"
    >
      <div className="pr-2">{title}</div>
      <ChevronRight className="font-medium text-black p-1" size={24} />
    </div>
  );
};
export default CustomSubmenuLink;
