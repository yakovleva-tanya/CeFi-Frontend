import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import SuccessScreen from "../SuccessScreen/SuccessScreen";
import Card from "../UI/Card";
import "./borrow.scss";
import FirstStageTable from "./FirstStageTable";
import SecondStageTable from "./SecondStageTable";
import ThirdStageTable from "./ThirdStageTable";
import BorrowMetrics from "./BorrowMetrics";
import PrimaryButton from "../UI/PrimaryButton";
import BorrowPageContextProvider, {
  BorrowPageContext,
} from "../../context/borrowContext";
import StageBar from "./StageBar";
import { AppContext, AppContextState } from "../../context/app";


const Borrow = () => {
  const [success, setSuccess] = useState(false);
  const { stage, setStage, submenu } = useContext(BorrowPageContext);

  const { state, updateAppState } = useContext(AppContext);

  const loggedIn = state.web3State?.address || "";
  const toggleLoginModal = (show: boolean) =>
    updateAppState((st: AppContextState) => ({ ...st, loginModal: { show } }));


  return (
    <Container>
      {success ? (
        <SuccessScreen type="borrow" link="link" />
      ) : (
        <div className="borrow">
          <div className="cards-container">
            <Card className="main-card text-center" title="Borrow">
              <StageBar />
              {submenu ? (
                submenu
              ) : (
                <div>
                  {stage === 1 && (
                    <div>
                      <FirstStageTable />
                      {loggedIn ? (
                        <PrimaryButton
                          text="Get Loan Terms"
                          onClick={() => {
                            //Get LoanTerms
                            setStage(stage + 1);
                          }}
                        />
                      ) : (
                        <PrimaryButton
                          text="Connect Wallet"
                          onClick={() => toggleLoginModal(true)}
                        />
                      )}
                    </div>
                  )}
                  {stage === 2 && (
                    <div>
                      <SecondStageTable />
                      <PrimaryButton
                        text="Accept Loan Terms"
                        onClick={() => {
                          //Accept loan terms
                          setStage(stage + 1);
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
                          //Request Loan
                          setSuccess(true);
                        }}
                      />
                    </div>
                  )}
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

const BorrowContextWrapper = () => {
  return (
    <BorrowPageContextProvider>
      <Borrow />
    </BorrowPageContextProvider>
  );
};
export default BorrowContextWrapper;
