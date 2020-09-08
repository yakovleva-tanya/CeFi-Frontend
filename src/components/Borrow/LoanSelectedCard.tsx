import React from "react";
import Arrow from "../UI/Arrow";

type loanSelectCardProps = {
  onClick: Function;
  title: string;
  subTitle: string;
  className?: string;
};
const LoanSelectCard = ({
  onClick,
  title,
  subTitle,
  className = "",
}: loanSelectCardProps) => {
  return (
    <div
      className={`pointer p-4 border-thin d-flex flex-row text-left align-items-center ${className}`}
      onClick={() => {
        onClick();
      }}
    >
      <div className="mr-4">
        <div className="font-medium text-xl mb-1">{title}</div>
        <div>{subTitle}</div>
      </div>
      <Arrow direction="right" />
    </div>
  );
};

export default LoanSelectCard;
