import React from "react";

interface RowProps {
  title: string;
  children: React.ReactNode;
}
const TableRow = ({ title, children }: RowProps) => {
  return (
    <div className="d-flex flex-row justify-content-between p-3 m-x-auto">
      <div className="p-1">{title}</div>
      {children}
    </div>
  )
}

export default TableRow;
