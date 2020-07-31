import React from "react";
import Button from 'react-bootstrap/Button';

import Card from "../UI/Card";

const Dashboard = () => {
  return (
    <div className="cards-container">
      <Card className="flex-1 text-center align-items-center" title="">
      </Card>
      <Card className='flex-2' title="Claim">
        <Button className="py-3 px-4 mt-2" variant="primary"> Collect interest </Button>
      </Card>
    </div>
  )
}
export default Dashboard;

