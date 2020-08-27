import React, { useContext } from "react";

import Card from "../UI/Card";
import BorrowMetrics from "./BorrowMetrics";
import StageBar from "./StageBar";
import BorrowForm from "./BorrowForm";

import "./borrow.scss";

import { BorrowPageContext } from "../../context/borrowContext";

const BorrowMainSection = () => {
  const { stage, setStage, borrowProcessState } = useContext(BorrowPageContext);

  const goBack = () => {
    setStage(stage - 1);
  };

  const showWarning = () => {
    borrowProcessState.setStageChangeWarning(true);
  };
  return (
    <div className="borrow">
      <div className="cards-container">
        <Card
          className="main-card text-center"
          title="Borrow"
          goBack={stage === 1 ? null : stage === 2 ? goBack : showWarning}
        >
          <div className="my-4 py-4">
            <StageBar />
            <BorrowForm />
          </div>
        </Card>
        <BorrowMetrics />
      </div>
    </div>
  );
};

export default BorrowMainSection;
