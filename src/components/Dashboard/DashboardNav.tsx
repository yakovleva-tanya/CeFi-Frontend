import React, { useContext } from "react";
import { DashboardContext } from "../../context/dashboardContext";
import BR from "../UI/BR";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from "react-router-dom";

type DashboardNavTyps = {
  className?: string;
  setExpanded?: Function;
  isMobile?: boolean;
};
const DashboardNav = ({
  className = "",
  setExpanded = () => {},
  isMobile = false,
}: DashboardNavTyps) => {
  const { onPage, navigationMap } = useContext(DashboardContext);
  return (
    <div
      className={`metrics-card border-thin p-2 my-2 mx-0 m-md-2 p-md-4 ${className}`}
    >
      {Object.keys(navigationMap).map((section) => {
        return (
          <div
            className={`m-2 ${section !== "SPEND" ? "mb-5" : ""}`}
            key={section}
          >
            <div className="mb-2 text-gray">{section}</div>
            <div className="mb-2 mr-md-5">
              <BR />
            </div>
            {Object.keys(navigationMap[section]).map((subsection) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  key={subsection}
                  className={`font-md-medium text-lg mb-1 pointer ${
                    onPage === navigationMap[section][subsection] && !isMobile
                      ? "text-black"
                      : "text-lightest-gray"
                  }`}
                  to={`/dashboard/${navigationMap[section][subsection]}`}
                  onClick={() => {
                    setExpanded(false);
                  }}
                >
                  <div
                    className={`font-medium text-lg mb-1 pointer ${
                      onPage === navigationMap[section][subsection] && !isMobile
                        ? "text-black"
                        : "text-lightest-gray"
                    }`}
                  >
                    {subsection}
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardNav;
