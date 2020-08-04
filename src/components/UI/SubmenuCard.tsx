import React from "react";
import BR from "../UI/BR";
import { ChevronLeft } from "react-bootstrap-icons";

interface CardProps {
  title: string;
  children: React.ReactNode;
  onClickAction: Function;
}
const SubmenuCard = ({ title, children, onClickAction }: CardProps) => {
  return (
    <div className="ui-card border-thin d-flex flex-column my-5">
      <div className="d-flex justify-content-center flex-row flex-1">
        <ChevronLeft
          className="pointer font-medium text-black m-3"
          size={24}
          onClick={() => {
            onClickAction();
          }}
        />
        <p className="p-3 m-0">{title}</p>
      </div>
      <BR />
      <div className="p-4 d-flex justify-content-center">
        <div style={{ maxWidth: "344px", width: "100%" }}>{children}</div>
      </div>
    </div>
  );
};

export default SubmenuCard;
