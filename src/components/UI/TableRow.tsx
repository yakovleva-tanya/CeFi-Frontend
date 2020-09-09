import React from "react";
import dai from "../../../dist/assets/dai-logo.svg";
import usdc from "../../../dist/assets/usdc-logo.svg";
import comp from "../../../dist/assets/comp-logo.svg";
import teller from "../../../dist/assets/teller-small-logo.svg";

interface RowProps {
  title: string;
  children: React.ReactNode;
  currency?: string;
}
const TableRow = ({ title, children, currency = "" }: RowProps) => {
  return (
    <div className="d-flex flex-row justify-content-between p-4 m-x-auto align-middle">
      <div className="d-flex flex-row align-items-center">
        {currency && (
          <div className="d-flex align-items-center">
            {currency === "DAI" && <img src={dai} height="20" />}
            {currency === "TLR" && <img src={teller} height="20" width='20' />}
            {currency === "USDC" && <img src={usdc} height="20" />}
            {currency === "COMP" && <img src={comp} height="20" />}
          </div>
        )}
        <div className="ml-2">{title}</div>
      </div>
      {children}
    </div>
  );
};

export default TableRow;
