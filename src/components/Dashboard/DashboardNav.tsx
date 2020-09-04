import React, { useContext } from "react";
import { DashboardContext } from "../../context/dashboardContext";

const DashboardNav = () => {
  const { onPage, setOnPage, navigationMap } = useContext(DashboardContext);
  return (
    <div className="metrics-card border-thin m-4 p-4">
      {Object.keys(navigationMap).map((section) => {
        return (
          <div className="m-2 pb-4" key={section}>
            <div className="mb-1 text-gray">{section}</div>
            {Object.keys(navigationMap[section]).map((subsection) => {
              return (
                <div
                  key={subsection}
                  className={`font-medium text-lg mb-1 pointer ${
                    onPage === navigationMap[section][subsection]
                      ? "text-black"
                      : "text-lightest-gray"
                  }`}
                  onClick={() => {
                    setOnPage(navigationMap[section][subsection]);
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
