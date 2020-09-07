import React from "react";
import BR from "../UI/BR";
import "./card.scss";
import Arrow from "./Arrow";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className: string;
  goBack?: null | Function;
  logo?: React.ReactNode;
  dashboard?:boolean
}

const Card = ({ title, children, className, goBack, logo, dashboard=false }: CardProps) => {
  return (
    <div className={`border-thin d-flex flex-column mx-2 my-4 ${className}`}>
      {goBack ? (
        <div className="px-4 d-flex justify-content-between align-items-center flex-row">
          <Arrow onClick={goBack} direction="left" />
          <div className="mx-auto d-flex flex-row align-items-center">
            {logo && <div className="mr-1">{logo}</div>}
            <p className="py-4 m-0 font-medium text-2xl">{title}</p>
          </div>
          <div></div>
        </div>
      ) : (
        <div className="mx-auto d-flex flex-row align-items-center">
          {logo && <div className="mr-1">{logo}</div>}
          <p className="py-4 m-0 font-medium text-2xl">{title}</p>
        </div>
      )}
      <BR />
      <div className="px-2 py-4 d-flex justify-content-center">
        <div
          style={
            dashboard ? { width: "80%" } : { maxWidth: "344px", width: "100%" }
          }
          className="m-4"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
