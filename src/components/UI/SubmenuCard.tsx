import React from "react";
import BR from "../UI/BR";
import Arrow from "./Arrow";

type CardProps = {
  title: string;
  children: React.ReactNode;
  onCloseAction: Function;
  className?: string;
};
const SubmenuCard = ({
  title,
  children,
  onCloseAction,
  className = "my-5",
}: CardProps) => {
  return (
    <div className={`border-thin d-flex flex-column ${className}`}>
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
        <div style={{ width: "80%" }} className="py-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SubmenuCard;
