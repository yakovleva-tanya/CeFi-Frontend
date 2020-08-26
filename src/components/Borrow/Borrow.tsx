import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import SuccessScreen from "../SuccessScreen/SuccessScreen";
import Card from "../UI/Card";
import "./borrow.scss";
import {
  AppContext,
  AppContextState,
  TellerTokens,
  BaseTokens,
} from "../../context/app";
import FirstStageTable from "./FirstStageTable";
import SecondStageTable from "./SecondStageTable";
import ThirdStageTable from "./ThirdStageTable";
import BorrowMetrics from "./BorrowMetrics";
import PrimaryButton from "../UI/PrimaryButton";
import BorrowPageContextProvider, {
  BorrowPageContext,
  LendingApplicationMap,
} from "../../context/borrowContext";
import StageBar from "./StageBar";
import LoginButton from "../LoginButton/LoginButton";
import { sendLendingApplication } from "../../models/ArrowheadCRA";
import { getLendingPoolDecimals } from "../../models/Contracts";
import { getNonce } from "../../models/DataProviders";
import ProcessingScreen from "../ProcessingScreen/ProcessingScreen";

const Borrow = () => {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isRequesting, setRequesting] = useState(false);

  const { stage, setStage, submenu, borrowRequest } = useContext(
    BorrowPageContext
  );
  const { state, updateAppState } = useContext(AppContext);

  const requestLoan = async () => {
    const { dataProviderResponse, web3State } = state;
    //TODO: this should update based on the selected ATM type.
    const { lendingPool } = state.teller.contracts[BaseTokens.ETH][
      TellerTokens.tDAI
    ];
    try {
      const tokenDecimals = await getLendingPoolDecimals(
        lendingPool,
        web3State
      );
      const nonceDataResponse = await getNonce();
      const lendingApplication = LendingApplicationMap(
        borrowRequest,
        dataProviderResponse.bankInfo,
        nonceDataResponse,
        tokenDecimals,
        web3State
      );
      const response = await sendLendingApplication(lendingApplication);
      console.log(response.data);
      return true;
    } catch (err) {
      console.log(err);
      updateAppState((st: AppContextState) => {
        const errorModal = {
          show: true,
          message:
            "An error occurred during the borrowing process. Please try again.",
          title: "Error",
        };
        return { ...st, errorModal };
      });
      return false;
    }
  };

  const loggedIn = state.web3State?.address || "";
  const onRequestLoan = async () => {
    setRequesting(true);
    const res = await requestLoan();
    setRequesting(false);
    setSuccess(res);
  };
  const onAcceptTerms = async() => {
    setSubmitting(true);
    //Accept loan terms
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitting(false);
    setStage(stage + 1);
  };
  return (
    <Container>
      {isSubmitting && (
        <ProcessingScreen link="" title="Submitting loan terms" />
      )}
      {isRequesting && <ProcessingScreen link="" title="Requesting Loan" />}
      {success && <SuccessScreen version="borrow" link="link" />}
      {!isSubmitting && !isRequesting && !success && (
        <div className="borrow">
          <div className="cards-container">
            <Card className="main-card text-center" title="Borrow">
              <div className="my-4 py-4">
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
                          <LoginButton />
                        )}
                      </div>
                    )}
                    {stage === 2 && (
                      <div>
                        <SecondStageTable />
                        <PrimaryButton
                          text="Accept Loan Terms"
                          onClick={onAcceptTerms}
                        />
                      </div>
                    )}
                    {stage === 3 && (
                      <div>
                        <ThirdStageTable />
                        <PrimaryButton
                          disabled={!borrowRequest.transferred}
                          text="Request Loan"
                          onClick={onRequestLoan}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
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
