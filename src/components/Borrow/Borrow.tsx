import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Axios from "axios";
import SuccessScreen from "../SuccessScreen/SuccessScreen";
import Card from "../UI/Card";
import "./borrow.scss";
import {
  AppContext,
  AppContextState,
  TellerTokens,
  BaseTokens
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

const Borrow = () => {
  const [success, setSuccess] = useState(false);
  const { stage, setStage, submenu, borrowRequest } = useContext(
    BorrowPageContext
  );
  const { state, updateAppState } = useContext(AppContext);

  const requestLoan = async () => {
    const { dataProviderResponse, web3State } = state;
    //TODO: this should update based on the selected ATM type.
    const { lendingPool } = state.teller.contracts[BaseTokens.ETH][TellerTokens.tDAI];
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
      setSuccess(true);
    } catch (err) {
      updateAppState((st: AppContextState) => {
        const errorModal = {
          show: true,
          message:
            "An error occurred during the borrowing process. Please try again.",
          title: "Error",
        };
        return { ...st, errorModal };
      });
    }
  };

  const loggedIn = state.web3State?.address || "";

  return (
    <Container>
      {success ? (
        <SuccessScreen version="borrow" link="link" />
      ) : (
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
                          onClick={requestLoan}
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
