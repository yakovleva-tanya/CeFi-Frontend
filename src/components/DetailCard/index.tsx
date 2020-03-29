import React, { useState, useContext } from "react";
import Card from 'react-bootstrap/Card';

import './index.scss';

interface DetailCardProps {
  callout: string;
  detail: string;
}

export default ({ callout, detail }: DetailCardProps) => {
  return <Card className="detail-card px-5 mb-5 w-100 border-0">
    <Card.Body>
      <div className="text-center"><h1 className="font-weight-bold">{callout}</h1></div>
      <div className="text-center text-muted"><h6>{detail.toUpperCase()}</h6></div>
    </Card.Body>
  </Card>;
}
