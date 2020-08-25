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
import { MockSubmitButton, CustomSubmitButton } from "../UI/CustomSubmitButton";

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

const DashboardLendSection = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <Card className="main-card text-center" title={subSection}>
      <div className="my-5">
        {subSection == "Claim" && (
          <div>
            <div className="text-gray mb-2">
              Select an asset to claim interest/rewards on
            </div>
            <div className="border-thin my-4">
              <TableRow title="100 DAI - $100 ">
                <MockSubmitButton text="Claim" />
              </TableRow>
              <BR />
              <TableRow title=" 204 USDC - $204.20  ">
                <MockSubmitButton text="Claim" />
              </TableRow>
              <BR />
              <TableRow title="12 TRL - $245.90 ">
                <MockSubmitButton text="Claim" />
              </TableRow>
              <BR />
              <TableRow title="20 COMP - $10.20 ">
                <MockSubmitButton text="Claim" />
              </TableRow>
            </div>
            <PrimaryButton text="Collect Interest" />
          </div>
        )}
        {subSection == "Withdraw" && <div className="text-gray">Withdraw </div>}
      </div>
    </Card>
  );
};

const DashboardBorrowSection = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <Card className="main-card text-center" title={subSection}>
      <div className="my-5">
        {subSection == "Repay" && (
          <div>
            <div>Outstanding loans</div>
            <div>Overdue loans</div>
            <div>Repaid loans</div>
          </div>
        )}
        {subSection == "Deposit" && (
          <div className="text-gray">
            Select the loan you want to deposit into
          </div>
        )}
        {subSection == "Withdraw" && (
          <div className="text-gray">
            Select the loan you want to withdraw collateral from
          </div>
        )}
      </div>
    </Card>
  );
};

const DashboardUseSection = () => {
  const { onPage } = useContext(DashboardContext);
  const subSection = onPage.split("-")[1];

  return (
    <Card className="main-card text-center" title={subSection}>
      <div className="my-5">
        {subSection == "Compound Finance" && (
          <div className="text-gray">
            Earn interest by supplying to Compound Finance.
          </div>
        )}
        {subSection == "Uniswap" && <div className="text-gray">Uniswap</div>}
      </div>
    </Card>
  );
};
