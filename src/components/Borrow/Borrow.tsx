import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Card from "../UI/Card";
import Metric from "../UI/Metric";
import { BorrowingSection } from "./../BorrowingSection";

const Borrow = () => {
  return (
    <div>
      <div className="cards-container">
        <Card
          className="main-card text-center align-items-center"
          title="Borrow"
        >
          <Button className="py-3 px-4 mt-2" variant="primary">
            Get Loan Terms
          </Button>
        </Card>
        <Card className="metrics-card" title="Metrics">
          <Metric title="Supply APY" value="8.40%" />
          <Metric title="Utilization" value="31%" />
          <Metric title="Wallet" value="84 DAI" />
          <Metric title="Collateral total" value="42 ETH" />
        </Card>
      </div>
      <Container>
        <BorrowingSection />
      </Container>
    </div>
  );
};
export default Borrow;
