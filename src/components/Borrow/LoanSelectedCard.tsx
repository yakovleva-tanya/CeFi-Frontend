import React from "react";
import Arrow from "../UI/Arrow";
import compound from "../../../dist/assets/compound-full-logo.svg";
import uniswap from "../../../dist/assets/uniswap-full-logo.svg";

type loanSelectCardProps = {
  onClick: Function;
  title: string;
  subTitle: string;
  className?: string;
  logos: Array<string>;
};
const LoanSelectCard = ({
  onClick,
  title,
  subTitle,
  className = "",
  logos,
}: loanSelectCardProps) => {
  return (
    <div
      className={`pointer p-4 border-thin d-flex flex-row text-left align-items-center ${className}`}
      onClick={() => {
        onClick();
      }}
    >
      <div className="mr-4 ml-2">
        <div className="font-medium text-xl">{title}</div>
        <div className="my-3">{subTitle}</div>
        <div className="mb-1 text-lightest-gray font-weight-bold text-xs">
          USE
        </div>
        <div className="d-flex flex-row">
          {logos.map((logo: string) => (
            <div key={logo}>
              {logo === "compound" && (
                <img src={compound} height={20} className="mr-3" />
              )}
              {logo === "uniswap" && <img src={uniswap} height={20} />}
            </div>
          ))}
        </div>
      </div>
      <Arrow direction="right" />
    </div>
  );
};

export default LoanSelectCard;
