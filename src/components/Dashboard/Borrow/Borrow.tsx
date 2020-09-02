import React, { useContext } from "react";
import { DashboardContext } from "../../../context/dashboardContext";
import Repay from "./Repay";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

const Borrow = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <div className="">
      {subSection == "Repay" && <Repay />}
      {subSection == "Deposit" && <Deposit />}
      {subSection == "Withdraw" && <Withdraw />}
    </div>
  );
};

export default Borrow;
