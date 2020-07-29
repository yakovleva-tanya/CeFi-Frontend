import React from "react";
import Button from 'react-bootstrap/Button';

import Card from "../UI/Card";
import Metric from '../UI/Metric';

const Borrow = () => {
  return (
    <div className="cards-container">
      <Card className="flex-2 text-center align-items-center" title="Borrow">
        <Button className="py-3 px-4 mt-2" variant="primary"> Get Loan Terms </Button>
      </Card>
      <Card className='flex-1' title="Metrics">
        <Metric title="Supply APY" value="8.40%" />
        <Metric title="Utilization" value="31%" />
        <Metric title="Wallet" value="84 DAI" />
        <Metric title="Collateral total" value="42 ETH" />
      </Card>
    </div>
  )
}
export default Borrow;

