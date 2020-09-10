import React, { useState, useContext, useEffect } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import { AppContext } from "../../context/app";

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
      {number + 1}
    </div>
  );
};

const StageBar = () => {
  const { state } = useContext(AppContext);

  const [progress, setProgress] = useState(0);
  const { stage, setSubmenu, borrowProcessState } = useContext(
    BorrowPageContext
  );
  const loggedIn = state.web3State?.address || "";

  useEffect(() => {
    const newProgress = 33 * stage;
    setProgress(newProgress);
  }, [stage]);

  const stages = [0, 1, 2, 3];

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
      <div className={`d-flex flex-row justify-content-between`}>
        {stages.map((s) => {
          return (
            <div key={s} className={` ${s < stage ? "pointer" : "disabled"}`}>
              <StageNumber
                number={s}
                onClickAction={() => {
                  if (s < stage) {
                    borrowProcessState.setStageChangeWarning(s);
                    setSubmenu(null);
                  }
                }}
                stage={stage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StageBar;
