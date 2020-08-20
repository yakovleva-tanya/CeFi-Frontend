import React from "react";

interface RowProps {
  title: string;
  children: React.ReactNode;
}
const TableRow = ({ title, children }: RowProps) => {
  return (
    <div className="d-flex flex-row justify-content-between p-4 m-x-auto align-middle">
      <div className="">{title}</div>
      {children}
    </div>
  )
}

export default TableRow;
