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
import LoginButton from "../LoginButton/LoginButton";
import { LoanInterface } from "../../context/types";
import { calculateCollateralPercent } from "../../actions/HelperFunctions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import copy from "../../copy.json";

const Dashboard = () => {
  const { state } = useContext(AppContext);
  const { web3State, tokenData } = state;
  const { setLoans } = useContext(DashboardContext);

  const updateLoans = async () => {
    const loans = await FetchLoans(web3State.network, web3State.address);
    const updatedLoans = loans.map((loan: LoanInterface) => {
      loan.currentCollateralPercent = calculateCollateralPercent(
        tokenData,
        loan
      );
      return loan;
    });
    setLoans(updatedLoans);
  };
  useEffect(() => {
    if (!tokenData) return;
    if (!web3State.address) return;
    updateLoans();
  }, [web3State.address, web3State.network, tokenData]);

  return (
    <Container>
      {web3State.address && tokenData ? (
        <div className="cards-container">
          <DashboardNav className="d-none d-md-block" />
          <Route path={`/dashboard/:onPage`} component={DashboardContent} />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column text-center ">
          <div>Please connect your wallet to view the dashboard</div>
          <LoginButton />
        </div>
      )}
    </Container>
  );
};
const DashboardContent = ({ match }: any) => {
  const { onPage, setOnPage } = useContext(DashboardContext);
  const section = onPage.split("-")[0];
  useEffect(() => {
    setOnPage(match.params.onPage);
  }, [match.params.onPage]);

  return (
    <>
      {section === "deposit" && <Lend />}
      {section === "borrow" && <Borrow />}
      {section === "spend" && <Use />}
    </>
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
