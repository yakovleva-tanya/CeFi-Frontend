import React, { useState, useContext } from "react";
import Card from 'react-bootstrap/Card';

interface DetailCardProps {
  callout: string;
  detail: string;
}

export default ({ callout, detail }: DetailCardProps) => {
  return <Card className="px-5 w-100">
    <Card.Body>
      <div className="text-center"><h1>{callout}</h1></div>
      <div className="text-center"><h4>{detail}</h4></div>
    </Card.Body>
  </Card>;
}