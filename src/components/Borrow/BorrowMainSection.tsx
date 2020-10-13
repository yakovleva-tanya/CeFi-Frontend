import React, { useContext } from "react";

import Card from "../UI/Card";
import BorrowMetrics from "./BorrowMetrics";
import StageBar from "./StageBar";
import BorrowForm from "./BorrowForm";
import copy from "../../copy.json";
import "./borrow.scss";

import { BorrowPageContext } from "../../context/borrowContext";

const BorrowMainSection = () => {
  const { stage, borrowProcessState } = useContext(BorrowPageContext);

  const showWarning = (s: number) => {
    borrowProcessState.setStageChangeWarning(s);
  };
  const { header } = copy.pages.borrow.main;

  return (
    <div className="borrow">
      <div className="cards-container">
        <Card
          className="main-card text-center"
          title={header}
          goBack={
            stage === 0
              ? null
              : () => {
                  showWarning(stage - 1);
                }
          }
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
