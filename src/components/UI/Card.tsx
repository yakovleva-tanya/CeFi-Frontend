import React from "react";
import BR from "../UI/BR";
import "./card.scss";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className: string;
}
const Card = ({ title, children, className }: CardProps) => {
  return (
    <div className={`ui-card border-thin d-flex flex-column m-2 ${className}`}>
      <div className="mx-auto">
        <p className="pt-4 pb-3 m-0 font-medium text-2xl">{title}</p>
      </div>
      <BR />
      <div className="px-2 d-flex justify-content-center">
        <div style={{ maxWidth: "344px", width: "100%" }} className = 'm-4 p-2'>{children}</div>
      </div>
    </div>
  );
};

export default Card;
