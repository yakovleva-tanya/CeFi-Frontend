import React from "react";
import dropdown from "../../../dist/assets/arrow-right.svg";
import './arrow.scss';

interface arrowProps  {
  direction: string,
  onClick?: Function
}
const Arrow = ({direction, onClick}: arrowProps) => {
  return (
    <img
      className={`pointer ${direction}`}
      height={14}
      src={dropdown}
      onClick = {()=>onClick()}
    />
  );
};
export default Arrow;
