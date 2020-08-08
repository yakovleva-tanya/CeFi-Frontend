import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import SuccessScreen from "../SuccessScreen/SuccessScreen";
import Card from "../UI/Card";
import "./borrow.scss";
import FirstStageTable from "./FirstStageTable";
import SecondStageTable from "./SecondStageTable";
import ThirdStageTable from "./ThirdStageTable";
import BorrowMetrics from "./BorrowMetrics";

type stageTypes = {
  number: number;
  stage: number;
  onClickAction: Function;
};

const StageNumber = ({ number, onClickAction, stage }: stageTypes) => {
  const isActive = number <= stage;
  return (
    <div
      className={`stage-number font-medium text-xl ${
        isActive ? "border-blue" : "border-gray"
      }`}
      onClick={() => {
        onClickAction();
      }}
    >
      {number}
    </div>
  );
};

const Borrow = () => {
  const [stage, setStage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateProgress = (newStage: number) => {
    if (newStage === 1) {
      setProgress(0);
      setStage(1);
    } else {
      const newProgress = 50 * (newStage - 1);
      for (let i = progress; i < newProgress; i++) {
        setTimeout(function () {
          setProgress(i);
        }, 1);
      }
      setTimeout(function () {
        setStage(newStage);
      }, 100);
    }
  };

  return (
    <Container>
      {success ? (
        <SuccessScreen type="borrow" link="link" />
      ) : (
        <div className="borrow">
          <div className="cards-container">
            <Card className="main-card text-center" title="Borrow">
              <div className="progress-bar-bg mt-5">
                <div
                  className="progress-bar-blue"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <StageNumber
                  number={1}
                  onClickAction={() => {
                    updateProgress(1);
                  }}
                  stage={stage}
                />
                <StageNumber
                  number={2}
                  onClickAction={() => {
                    updateProgress(2);
                  }}
                  stage={stage}
                />
                <StageNumber
                  number={3}
                  onClickAction={() => {
                    updateProgress(3);
                  }}
                  stage={stage}
                />
              </div>
              {stage === 1 && <FirstStageTable />}
              {stage === 2 && <SecondStageTable />}
              {stage === 3 && <ThirdStageTable />}
              <Button
                className="py-3 px-4 mt-2 mb-5"
                variant="primary"
                onClick={() => {
                  if (stage === 3) {
                    setSuccess(true);
                  } else {
                    updateProgress(stage + 1);
                  }
                }}
              >
                {stage === 1
                  ? `Get Loan Terms`
                  : stage === 2
                  ? `Accept Loan Terms`
                  : `Request Loan`}
              </Button>
            </Card>
            <BorrowMetrics />
          </div>
        </div>
      )}
    </Container>
  );
};
export default Borrow;
