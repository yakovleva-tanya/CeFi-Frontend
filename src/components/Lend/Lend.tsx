import React, { useState, useContext } from "react";
import { AppContext, AppContextState } from "../../context/app";

import { Formik } from "formik";
import completeSupply from "../../actions/lendDai";

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

const supplyFormValidation = () => {
  const errors = {};
  return errors;
};

const Lend = () => {
  const { tokensApproved, selectedAmount } = useContext(LendPageContext);
  const { state, updateAppState } = useContext(AppContext);
  const [transactionHash, setTransactionHash] = useState("");

  const loggedIn = state.web3State?.address || "";
  const initialSupplyValues = { amount: selectedAmount };

  return (
    <Container>
      {!transactionHash ? (
        <div className="cards-container">
          <Card
            className="main-card text-center align-items-center"
            title="Lend"
          >
            <Formik
              initialValues={initialSupplyValues}
              validate={supplyFormValidation}
              onSubmit={completeSupply(
                state,
                updateAppState,
                setTransactionHash
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
                  <div className="table border-thin my-5">
                    <TableRow title="Lend With">
                      <CurrencyDropdown />
                    </TableRow>
                    <BR />
                    <TableRow title="Approve">
                      <SubmitApproveButton />
                    </TableRow>
                  </div>
                  {loggedIn ? (
                    <PrimaryButton
                      text="Supply"
                      type="submit"
                      disabled={isSubmitting || !tokensApproved}
                    />
                  ) : (
                    <LoginButton />
                  )}
                </Form>
              )}
            </Formik>
          </Card>
          <LendMetrics />
        </div>
      ) : (
        <SuccessScreen type="lend" link={transactionHash} />
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
