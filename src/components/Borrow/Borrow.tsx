import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import "./borrow.scss";

import ProcessingScreen from "../ProcessingScreen/ProcessingScreen";
import WarningModal from "../UI/WarningModal";
import SuccessScreen from "../SuccessScreen/SuccessScreen";
import BorrowMainSection from "./BorrowMainSection";

import BorrowPageContextProvider, {
  BorrowPageContext,
} from "../../context/borrowContext";

const Borrow = () => {
  const { stage, setStage, borrowProcessState } = useContext(BorrowPageContext);
  const {
    isSubmitting,
    isRequesting,
    success,
    stageChangeWarning,
    setStageChangeWarning,
  } = borrowProcessState;

  return (
    <Container>
      {true && (
        <WarningModal
          show={stageChangeWarning}
          text="Going back will result in having to submit another transaction approval and cost additional gas fees. Are you sure you want to proceed?"
          proceed={() => {
            setStage(stage - 1);
            setStageChangeWarning(false);
          }}
          cancel={() => {
            setStageChangeWarning(false);
          }}
        />
      )}
      {isSubmitting && (
        <ProcessingScreen link="" title="Submitting terms" />
      )}
      {isRequesting && <ProcessingScreen link="" title="Requesting Loan" />}
      {success && (
        <SuccessScreen
          title="Loan accepted"
          message={
            <div>
              <div>
                Go to dashboard or click{" "}
                <a target="_blank" rel="noreferrer" href="">
                  here.
                </a>{" "}
                to view you borrow balance.
              </div>
              <div>Get started using your loan by exploring our dashboard.</div>
            </div>
          }
        />
      )}
      {!isSubmitting && !isRequesting && !success && <BorrowMainSection />}
    </Container>
  );
};

const BorrowContextWrapper = () => {
  return (
    <BorrowPageContextProvider>
      <Borrow />
    </BorrowPageContextProvider>
  );
};
export default BorrowContextWrapper;
