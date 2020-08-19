import React from "react";
import Container from "react-bootstrap/Container";
import Card from "../UI/Card";
import PrimaryButton from "../UI/PrimaryButton";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import Metric from "../UI/Metric";

const Dashboard = () => {
  return (
    <Container>
      <div className="cards-container">
        <Card className="metrics-card" title="">
          <Metric title="LEND" />
          <Metric title="Claim" />
          <Metric title="Withdraw" />
        </Card>
        <Card className="main-card text-center" title="Claim">
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
export default Dashboard;
