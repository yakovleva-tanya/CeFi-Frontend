import React from "react";
import CurrencyIcon from "./CurrencyIcon";
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
            <CurrencyIcon currency={currency} />
          </div>
        )}
        <div className="ml-2">{title}</div>
      </div>
      {children}
    </div>
  );
};

export default TableRow;
