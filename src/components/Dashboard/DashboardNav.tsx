import React, { useContext } from "react";
import { DashboardContext } from "../../context/dashboardContext";

const dashboardMap: any = {
  LEND: { Claim: "Lend-Claim", Withdraw: "Lend-Withdraw" },
  BORROW: {
    Repay: "Borrow-Repay",
    Deposit: "Borrow-Deposit",
    Withdraw: "Borrow-Withdraw",
  },
  USE: { "Compound Finance": "Use-Compound", Uniswap: "Use-Uniswap" },
};

const DashboardNav = () => {
  const { onPage, setOnPage } = useContext(DashboardContext);
  return (
    <div className="metrics-card border-thin m-4 p-4">
      {Object.keys(dashboardMap).map((section) => {
        return (
          <div className="m-2 pb-4" key={section}>
            <div className="mb-1">{section}</div>
            {Object.keys(dashboardMap[section]).map((subsection) => {
              return (
                <div
                  key={subsection}
                  className={`font-medium text-lg mb-1 pointer ${
                    onPage === dashboardMap[section][subsection]
                      ? "text-black"
                      : "text-lightest-gray"
                  }`}
                  onClick={() => {
                    setOnPage(dashboardMap[section][subsection]);
                  }}
                >
                  {subsection}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardNav;
