import React, { useState, useContext, useEffect } from "react";
import { BorrowPageContext } from "../../context/borrowContext";

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

const StageBar = () => {
  const [progress, setProgress] = useState(0);
  const { stage, setStage } = useContext(BorrowPageContext);

  useEffect(() => {
    const newProgress = 50 * (stage - 1);
    setProgress(newProgress);
  }, [stage]);

  const stages = [1, 2, 3];

  return (
    <div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-blue"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <div className="d-flex flex-row justify-content-between">
        {stages.map((s) => {
          return (
            <StageNumber
              key={s}
              number={s}
              onClickAction={() => {
                setStage(s);
              }}
              stage={stage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StageBar;
