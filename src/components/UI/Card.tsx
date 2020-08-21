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
    <div
      className={`ui-card border-thin d-flex flex-column mx-2 my-4 ${className}`}
    >
      <div className="mx-auto">
        <p className="pt-4 pb-4 m-0 font-medium text-2xl">{title}</p>
      </div>
      <BR />
      <div className="px-2 d-flex justify-content-center">
        <div style={{ maxWidth: "344px", width: "100%" }} className="m-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
