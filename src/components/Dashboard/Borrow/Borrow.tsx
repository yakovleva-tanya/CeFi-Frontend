import React, { useContext } from "react";
import { DashboardContext } from "../../../context/dashboardContext";
import Repay from "./Repay";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Card from "../../UI/Card";

const Borrow = () => {
  const { onPage, loans } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];
  return (
    <div className="">
      {loans && loans.length > 0 ? (
        <>
          {subSection == "repay" && <Repay />}
          {subSection == "deposit" && <Deposit />}
          {subSection == "withdraw" && <Withdraw />}
        </>
      ) : (
        <Card
          className="main-card text-center w-80"
          title={""}
          dashboard={true}
        >
          <div>No Loans</div>
        </Card>
      )}
    </div>
  );
};

export default Borrow;
