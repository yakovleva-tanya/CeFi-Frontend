import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import DashboardContextProvider, {
  DashboardContext,
} from "../../context/dashboardContext";
import DashboardNav from "./DashboardNav";
import Lend from "./Lend";
import Borrow from "./Borrow";
import Use from "./Use";

const Dashboard = () => {
  const { onPage } = useContext(DashboardContext);
  const section = onPage.split("-")[0];

  return (
    <Container>
      <div className="cards-container">
        <DashboardNav />
        {section === "Lend" && <Lend />}
        {section === "Borrow" && <Borrow />}
        {section === "Use" && <Use />}
      </div>
    </Container>
  );
};

const DashboardContextWrapper = () => {
  return (
    <DashboardContextProvider>
      <Dashboard />
    </DashboardContextProvider>
  );
};
export default DashboardContextWrapper;
