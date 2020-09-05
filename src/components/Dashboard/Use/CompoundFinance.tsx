import React, { useContext } from "react";
import {
  UseCompoundContext,
  UseCompoundContextProvider,
} from "../../../context/dashboardContext";

import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import UseCompoundMainSection from "./UseCompoundMainSection";
import Card from "../../UI/Card";
import logo from "../../../../dist/assets/compound-logo.svg";

const CompoundLogo = () => {
  return <img className="mr-3" src={logo} height="31" />;
};

const CompoundFinancePage = () => {
  const {
    success,
    setSuccess,
    isWithdrawing,
    isSupplying,
    successMessage,
    selectedLoan,
    setSelectedLoan,
  } = useContext(UseCompoundContext);

  return (
    <Card
      dashboard={true}
      className="main-card text-center"
      title={selectedLoan ? `ID ${selectedLoan.id}` : "Compound"}
      logo={selectedLoan ? null : <CompoundLogo />}
      goBack={
        selectedLoan
          ? () => {
              setSelectedLoan(null);
            }
          : null
      }
    >
      {success && (
        <SuccessScreen
          fullScreen={false}
          title={successMessage}
          onButtonClick={() => {
            setSuccess(false);
          }}
          message={
            <div>
              View transaction status{" "}
              <a className="link text-gray">
                <u>here</u>
              </a>
              .
            </div>
          }
          CTA="Go back"
        />
      )}
      {isWithdrawing && (
        <ProcessingScreen
          link=""
          fullScreen={false}
          title="Withdrawing deposit"
        />
      )}
      {isSupplying && (
        <ProcessingScreen link="" fullScreen={false} title="Depositing" />
      )}
      {!success && !isWithdrawing && !isSupplying && <UseCompoundMainSection />}
    </Card>
  );
};

const CompoundFinance = () => {
  return (
    <UseCompoundContextProvider>
      <CompoundFinancePage />
    </UseCompoundContextProvider>
  );
};

export default CompoundFinance;
