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
import ProcessingScreen from "../ProcessingScreen/ProcessingScreen";

const supplyFormValidation = () => {
  const errors = {};
  return errors;
};
const getEtherscanLink = (hash: string, network: string) =>{
  if(network == '4') return `https://rinkeby.etherscan.io/tx/${hash}`;
  else if(network == '3') return `https://ropsten.etherscan.io/tx/${hash}`;
  else return `https://etherscan.io/tx/${hash}`;
}

const Lend = () => {
  const { tokensApproved } = useContext(LendPageContext);
  const { state, updateAppState } = useContext(AppContext);
  const [transactionHash, setTransactionHash] = useState("");
  const [processing, setProcessing] = useState("");
  const loggedIn = state.web3State?.address || "";
  const network = state.web3State?.network || "";
  const initialSupplyValues = { amount: "0.00" };

  return (
    <Container>
      {!processing && !transactionHash && (
        <div className="cards-container">
          <Card
            className="main-card text-center align-items-center"
            title="Supply"
          >
            <div className = "my-2 py-4">
              <Formik
                initialValues={initialSupplyValues}
                validate={supplyFormValidation}
                onSubmit={completeSupply(
                  state,
                  updateAppState,
                  setTransactionHash,
                  setProcessing
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
                      <TableRow title="Supply With">
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
            </div>
          </Card>
          <LendMetrics />
        </div>
      )}
      {processing && (
        <ProcessingScreen link={getEtherscanLink(processing, network)} />
      )}
      {transactionHash && (
        <SuccessScreen
          version="lend"
          link={getEtherscanLink(transactionHash, network)}
          onButtonClick={() => {
            setTransactionHash("");
          }}
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
