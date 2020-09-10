import React, { useContext } from "react";
import { DashboardContext } from "../../context/dashboardContext";
import BR from "../UI/BR";

const DashboardNav = () => {
  const { onPage, setOnPage, navigationMap } = useContext(DashboardContext);
  return (
    <div className="metrics-card border-thin m-2 p-4">
      {Object.keys(navigationMap).map((section) => {
        return (
          <div className="m-2 mb-5" key={section}>
            <div className="mb-2 text-gray">{section}</div>
            <div className="mb-2 mr-5">
              <BR />
            </div>
            {Object.keys(navigationMap[section]).map((subsection) => {
              const linkDisabled = Boolean(section === "SPEND");
              return (
                <div
                  key={subsection}
                  className={`font-medium text-lg mb-1 ${
                    linkDisabled ? "" : "pointer"
                  } ${
                    onPage === navigationMap[section][subsection]
                      ? "text-black"
                      : "text-lightest-gray"
                  }`}
                  onClick={() => {
                    if (linkDisabled) return;
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
