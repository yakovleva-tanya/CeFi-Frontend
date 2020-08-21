import React from "react";
import BR from "../UI/BR";
import Arrow from "./Arrow";

type CardProps = {
  title: string;
  children: React.ReactNode;
  onCloseAction: Function;
};
const SubmenuCard = ({ title, children, onCloseAction }: CardProps) => {
  return (
    <div className="ui-card border-thin d-flex flex-column my-5">
      <div className="d-flex justify-content-between align-items-center flex-row flex-1 m-4">
        <Arrow
          onClick={() => {
            onCloseAction();
          }}
          direction="left"
        />
        <p className="m-0 align-center">{title}</p>
        <div></div>
      </div>
      <BR />
      <div className="p-4 d-flex justify-content-center">
        <div style={{ maxWidth: "344px", width: "100%" }} className="py-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SubmenuCard;
