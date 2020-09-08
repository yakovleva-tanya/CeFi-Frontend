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
    setSuccess,
  } = borrowProcessState;

  return (
    <Container>
      {true && (
        <WarningModal
          show={stageChangeWarning !== null}
          text="Changes to terms will require an approval transaction and accrue additional gas fees. Would you like to proceed?"
          proceed={() => {
            setStage(stageChangeWarning);
            setStageChangeWarning(null);
          }}
          cancel={() => {
            setStageChangeWarning(null);
          }}
        />
      )}
      {isSubmitting && <ProcessingScreen link="" title="Submitting terms" />}
      {isRequesting && <ProcessingScreen link="" title="Requesting Loan" />}
      {success && (
        <SuccessScreen
          title="Loan accepted"
          message={
            <div>
              <div>
                Go to dashboard or{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="link text-gray pointer"
                  onClick={() => {
                    setStage(1);
                    setSuccess(false);
                  }}
                >
                  <u>click here</u>
                </a>{" "}
                to view your borrow balance.
              </div>
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
