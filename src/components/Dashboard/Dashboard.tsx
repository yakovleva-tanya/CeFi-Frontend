import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import DashboardContextProvider, {
  DashboardContext,
} from "../../context/dashboardContext";
import DashboardNav from "./DashboardNav";
import DashboardLendSection from './DashboardLendSection'
import DashboardBorrowSection from "./DashboardBorrowSection";
import DashboardUseSection from "./DashboardUseSection";

const Dashboard = () => {
  const { onPage } = useContext(DashboardContext);
  const section = onPage.split("-")[0];

  return (
    <Container>
      <div className="cards-container">
        <DashboardNav />
        {section === "Lend" && <DashboardLendSection />}
        {section === "Borrow" && <DashboardBorrowSection />}
        {section === "Use" && <DashboardUseSection />}
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


