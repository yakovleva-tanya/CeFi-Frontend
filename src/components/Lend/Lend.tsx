import React, { useState, useContext, useEffect } from "react";
import { AppContext, AppContextState } from "../../context/app";

import { Formik } from "formik";
import completeSupply from "../../actions/lendTokens";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import SuccessScreen from "../SuccessScreen/SuccessScreen";
import CurrencyDropdown from "./CurrencyDropdown";
import SubmitApproveButton from "./SubmitApproveButton";
import LendMetrics from "./LendMetrics";
import LendAmountInput from "./LendAmountInput";

import Card from "../UI/Card";
import BR from "../UI/BR";
import TableRow from "../UI/TableRow";
import PrimaryButton from "../UI/PrimaryButton";
import LendPageContextProvider, {
  LendPageContext,
} from "../../context/lendContext";
import LoginButton from "../LoginButton/LoginButton";
import "./lend.scss";
import ProcessingScreen from "../ProcessingScreen/ProcessingScreen";
import { getEtherscanLink } from "../../actions/HelperFunctions";
import FormValidationWarning from "../UI/FormValidationWarning";
import copy from "../../copy.json";

const supplyFormValidation = () => {
  const errors = {};
  return errors;
};

const Lend = () => {
  const { tokensApproved, selectedCurrency, selectedAmount } = useContext(
    LendPageContext
  );
  const { state, updateAppState } = useContext(AppContext);
  const [transactionHash, setTransactionHash] = useState("");
  const [processing, setProcessing] = useState("");
  const [amountExceeded, setAmountExceeded] = useState("");

  const loggedIn = state.web3State?.address || "";
  const network = state.web3State?.network || "";
  const initialSupplyValues = { amount: "0.00" };

  const balance = state.teller?.userWalletBalance;
  const pageCopy = copy.pages.deposit.main;
  const {
    depositTitle,
    approveTitle,
    CTA,
    amountExceededMessage,
  } = pageCopy.form;
  const { header, successMessage, loadingMessage } = pageCopy;
  useEffect(() => {
    if (!balance) return;
    if (selectedAmount > balance[selectedCurrency]) {
      setAmountExceeded(amountExceededMessage);
    } else {
      setAmountExceeded("");
    }
  }, [selectedAmount, balance]);

  return (
    <Container>
      {!processing && !transactionHash && (
        <div className="cards-container">
          <Card
            className="main-card text-center align-items-center"
            title={header}
          >
            <div className="my-3">
              <Formik
                initialValues={initialSupplyValues}
                validate={supplyFormValidation}
                onSubmit={completeSupply(
                  state,
                  updateAppState,
                  setTransactionHash,
                  setProcessing,
                  selectedCurrency,
                  selectedAmount
                )}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <LendAmountInput
                      amount={values.amount}
                      handleChange={handleChange}
                    />
                    <div className="table border-thin mt-5 mb-4">
                      <TableRow title={depositTitle}>
                        <CurrencyDropdown />
                      </TableRow>
                      <BR />
                      <TableRow title={approveTitle}>
                        <SubmitApproveButton />
                      </TableRow>
                    </div>
                    <FormValidationWarning message={amountExceeded} />
                    {loggedIn ? (
                      <PrimaryButton
                        text={CTA}
                        type="submit"
                        disabled={isSubmitting || !tokensApproved}
                      />
                    ) : (
                      <LoginButton />
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
          <LendMetrics />
        </div>
      )}
      {processing && (
        <ProcessingScreen
          link={getEtherscanLink(processing, network)}
          title={loadingMessage.title}
        />
      )}
      {transactionHash && (
        <SuccessScreen
          onButtonClick={() => {
            setTransactionHash("");
          }}
          title={successMessage.title}
          message={
            <div>
              Go to dashboard or{" "}
              <a
                className="link text-gray"
                target="_blank"
                rel="noreferrer"
                //href={getEtherscanLink(transactionHash, network)}
              >
                <u>click here</u>
              </a>{" "}
              to view you deposit balance.
            </div>
          }
        />
      )}
    </Container>
  );
};

const LendPageContextWrapper = () => {
  return (
    <LendPageContextProvider>
      <Lend />
    </LendPageContextProvider>
  );
};

export default LendPageContextWrapper;
