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
import copy from "../../copy.json";

const Borrow = () => {
  const { setStage, borrowProcessState } = useContext(BorrowPageContext);
  const {
    isSubmitting,
    isRequesting,
    success,
    stageChangeWarning,
    setStageChangeWarning,
    setSuccess,
  } = borrowProcessState;
  const pageCopy = copy.pages.borrow.main.form;
  const goBackWarning = pageCopy.goBackWarning;
  const submittingTermsLoadingScreen =
    pageCopy.step3.submittingTermsLoadingScreen;
  const requestingLoanLoadingScreen =
    pageCopy.step4.requestingLoanLoadingScreen;
  const successScreen = pageCopy.successScreen;

  return (
    <Container>
      {
        <WarningModal
          show={stageChangeWarning !== null}
          text={goBackWarning}
          proceed={() => {
            setStage(stageChangeWarning);
            setStageChangeWarning(null);
          }}
          cancel={() => {
            setStageChangeWarning(null);
          }}
        />
      }
      {isSubmitting && (
        <ProcessingScreen link="" title={submittingTermsLoadingScreen.title} />
      )}
      {isRequesting && (
        <ProcessingScreen link="" title={requestingLoanLoadingScreen.title} />
      )}
      {success && (
        <SuccessScreen
          title={successScreen.title}
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
