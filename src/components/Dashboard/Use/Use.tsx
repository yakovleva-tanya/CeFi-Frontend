import React, { useContext } from "react";
import Card from "../../UI/Card";
import { DashboardContext } from "../../../context/dashboardContext";
import CompoundFinance from "./CompoundFinance";
import Uniswap from "./Uniswap";

const Use = () => {
  const { onPage, loans } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <div>
      {loans && loans.length > 0 ? (
        <>
          {subSection == "compound" && <CompoundFinance />}
          {subSection == "uniswap" && <Uniswap />}
        </>
      ) : (
        <Card title={""} className="main-card text-center w-80">
          <div>No Loans</div>
        </Card>
      )}
    </div>
  );
};

export default Use;
