import React, { useState, useContext } from "react";
import { Formik } from "formik";
import { AppContext, AppContextState } from "../../context/app";
import supplyDai from "../../actions/lendDai";
import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import SuccessScreen from "../SuccessScreen/SuccessScreen";
import CurrencyDropdown from "./CurrencyDropdown";
import SubmitApproveButton from "./SubmitApproveButton";
import LendMetrics from "./LendMetrics";
import Card from "../UI/Card";
import BR from "../UI/BR";
import TableRow from "../UI/TableRow";

import "./lend.scss";

type RatesType = {
  [key: string]: number;
};

const exchangeRates: RatesType = {
  USDT: 0.998,
  DAI: 1.033,
  USDC: 1.001,
};

const convertCurrency = (currency: number, amount: number) =>
  (amount / currency).toFixed(2);

const completeSupply = (
  state: any,
  updateAppState: Function,
  setTransactionHash: Function
) => async (values: any) => {
  const amount = values.amount;
  const primaryAddress = state.web3State.address;
  const { lendingPool, zDai } = state.zeroCollateral.contracts;
  try {
    const { balance, transactionHash } = await supplyDai(
      amount,
      primaryAddress,
      lendingPool,
      zDai,
      state.web3State
    );
    setTransactionHash(transactionHash);
    updateAppState((st: AppContextState) => {
      const zeroCollateral = st.zeroCollateral;
      zeroCollateral.balance = balance;
      return { ...st, zeroCollateral };
    });
  } catch (error) {
    console.log(error);
    updateAppState((st: AppContextState) => {
      const errorModal = {
        show: true,
        message:
          "An error occurred during the lending process. Please try again.",
        title: "Error",
      };
      return { ...st, errorModal };
    });
  }
};

const supplyFormValidation = () => {
  const errors = {};
  return errors;
};

const Lend = () => {
  const currencies = ["DAI", "USDT", "USDC"];
  const [currency, setCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState(0.0);
  const [transactionHash, setTransactionHash] = useState("");
  const [tokensApproved, setTokensApproved] = useState(false);
  const { state, updateAppState } = useContext(AppContext);

  const loggedIn = state.web3State?.address || "";
  const walletBalance = state.zeroCollateral?.balance
    ? state.zeroCollateral?.balance
    : "-";
  const initialSupplyValues = { amount };
  const toggleLoginModal = (show: boolean) =>
    updateAppState((st: AppContextState) => ({ ...st, loginModal: { show } }));

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
                  <div className="mt-5">
                    <input
                      className="input text-5xl font-medium text-black"
                      value={`$${values.amount}`}
                      name="amount"
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                        handleChange(e);
                        setAmount(parseFloat(e.target.value));
                      }}
                      onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                    <div className="text-lightest-gray text-lg">
                      {`${convertCurrency(
                        exchangeRates[currency],
                        amount
                      )} ${currency}`}
                    </div>
                  </div>
                  <div className="table border-thin my-5">
                    <TableRow title="Lend With">
                      <CurrencyDropdown
                        currencies={currencies}
                        currency={currency}
                        setCurrency={setCurrency}
                        tokensApproved={tokensApproved}
                        setTokensApproved={setTokensApproved}
                      />
                    </TableRow>
                    <BR />
                    <TableRow title="Approve">
                      <SubmitApproveButton
                        amount={amount}
                        loggedIn={loggedIn}
                        tokensApproved={tokensApproved}
                        setTokensApproved={setTokensApproved}
                      />
                    </TableRow>
                  </div>
                  {!loggedIn ? (
                    <Button
                      className="py-3 px-4 mb-5 mt-4 text-lg "
                      variant="primary"
                      onClick={() => toggleLoginModal(true)}
                    >
                      Connect Wallet
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !loggedIn || !tokensApproved}
                      className={`py-3 px-4 text-lg mb-5 mt-4 ${
                        loggedIn && tokensApproved ? "pointer" : "disabled"
                      }`}
                      variant="primary"
                    >
                      Supply
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </Card>
          <LendMetrics
            currency={currency}
            price={exchangeRates[currency]}
            walletBalance={walletBalance.toString()}
          />
        </div>
      ) : (
        <SuccessScreen type="lend" link={transactionHash} />
      )}
    </Container>
  );
};

export default Lend;
