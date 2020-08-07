import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import SuccessScreen from "../SuccessScreen/SuccessScreen";
import Card from "../UI/Card";
import "./borrow.scss";
import FirstStageTable from "./FirstStageTable";
import SecondStageTable from "./SecondStageTable";
import ThirdStageTable from "./ThirdStageTable";
import BorrowMetrics from "./BorrowMetrics";
import PrimaryButton from "../UI/PrimaryButton";

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
              {stage === 1 && (
                <div>
                  <FirstStageTable />
                  <PrimaryButton
                    text="Get Loan Terms"
                    onClick={() => {
                      updateProgress(stage + 1);
                    }}
                  />
                </div>
              )}
              {stage === 2 && (
                <div>
                  <SecondStageTable />
                  <PrimaryButton
                    text="Accept Loan Terms"
                    onClick={() => {
                      updateProgress(stage + 1);
                    }}
                  />
                </div>
              )}
              {stage === 3 && (
                <div>
                  <ThirdStageTable />
                  <PrimaryButton
                    text="Request Loan"
                    onClick={() => {
                      setSuccess(true);
                    }}
                  />
                </div>
              )}
            </Card>
            <BorrowMetrics />
          </div>
        </div>
      )}
    </Container>
  );
};
export default Borrow;
