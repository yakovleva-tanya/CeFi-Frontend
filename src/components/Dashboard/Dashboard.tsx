import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import DashboardContextProvider, {
  DashboardContext,
} from "../../context/dashboardContext";
import DashboardNav from "./DashboardNav";
import Lend from "./Lend";
import Borrow from "./Borrow";
import Use from "./Use";
import FetchLoans from "../../models/FetchLoans";
import { AppContext } from "../../context/app";

const Dashboard = () => {
  const { state } = useContext(AppContext);
  const { web3State } = state;
  const { onPage, setLoans } = useContext(DashboardContext);

  const updateLoans = async () => {
    const loans = await FetchLoans(web3State.network, web3State.address);
    setLoans(loans);
  };
  useEffect(() => {
    updateLoans();
  }, [web3State.address, web3State.network]);

  const section = onPage.split("-")[0];

  return (
    <Container>
      <div className="cards-container">
        <DashboardNav />
        {section === "Lend" && <Lend />}
        {section === "Borrow" && <Borrow />}
        {section === "Spend" && <Use />}
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
