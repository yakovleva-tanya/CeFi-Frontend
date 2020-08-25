import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Card from "../UI/Card";
import PrimaryButton from "../UI/PrimaryButton";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import DashboardContextProvider, {
  DashboardContext,
} from "../../context/dashboardContext";
import DashboardNav from "./DashboardNav";

const Dashboard = () => {
  const { onPage } = useContext(DashboardContext);
  const sectionTitle = onPage.split("-")[1];

  return (
    <Container>
      <div className="cards-container">
        <DashboardNav />
        <Card className="main-card text-center" title={sectionTitle}>
          <div className="table border-thin my-5">
            <TableRow title="100 DAI - $100">
              <div></div>
            </TableRow>
            <BR />
            <TableRow title="63 USDT - $63">
              <div></div>
            </TableRow>
            <BR />
            <TableRow title="204 USDC - $204.20">
              <div></div>
            </TableRow>
          </div>
          <PrimaryButton text="Collect Interest" />
        </Card>
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
