import React, { useState } from "react";

const BorrowDepositSubsection = () => {
  const [success, setSuccess] = useState(false);
  const [isDepositing, setDepositing] = useState(false);

  return (
    <div>

      <DepositMainSection />
    </div>
  );
};
export default BorrowDepositSubsection;

const DepositMainSection = () => {
  return (
    <div className="text-gray">Select the loan you want to deposit into</div>
  );
};
