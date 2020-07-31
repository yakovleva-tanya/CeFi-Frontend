import React, { useState, useContext } from "react";
import { Formik } from "formik";
import { AppContext, AppContextState } from "../../context/app";
import lendDai from "../../actions/lendDai";

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

const completeLendingForm = (state: any, updateAppState: Function) => async (
  values: any,
  { setSubmitting }: any
) => {
  const amount = values.amount;
  const primaryAddress = state.web3State.address;
  const { lendingPool, zDai } = state.zeroCollateral.contracts;
  try {
    const balance = await lendDai(
      amount,
      primaryAddress,
      lendingPool,
      zDai,
      state.web3State
    );
    setSubmitting(false);
    updateAppState((st: AppContextState) => {
      const zeroCollateral = st.zeroCollateral;
      zeroCollateral.balance = balance;
      return { ...st, zeroCollateral };
    });
  } catch (error) {
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
  const [currency, setCurrency] = useState("DAI");
  const [amount, setAmount] = useState(10);
  const [trackingLink, setTrackingLink] = useState(""); // should be assigned once lending processed
  const [tokensSubmitted, setTokensSubmitted] = useState(false);

  const { state, updateAppState } = useContext(AppContext);

  const loggedIn = state.web3State?.address || "";
  const walletBalance = state.zeroCollateral?.balance
    ? state.zeroCollateral?.balance
    : "-";
  const initialSupplyValues = { amount };
  const toggleLoginModal = (show: boolean) =>
    updateAppState((st: AppContextState) => ({ ...st, loginModal: { show } }));

  return (
    <div>
      {!trackingLink ? (
        <div className="cards-container">
          <Card className="flex-2 text-center align-items-center" title="Lend">
            <Formik
              initialValues={initialSupplyValues}
              validate={supplyFormValidation}
              onSubmit={completeLendingForm(state, updateAppState)}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="my-2">
                    <span className="text-5xl font-medium">$</span>
                    <input
                      className="input text-5xl font-medium text-black"
                      type="number"
                      name="amount"
                      onChange={(e) => {
                        handleChange(e);
                        setAmount(parseInt(e.target.value));
                      }}
                      value={values.amount}
                    />
                    <div className="text-lightest-gray text-lg">
                      {`${convertCurrency(
                        exchangeRates[currency],
                        amount
                      )} ${currency}`}
                    </div>
                  </div>
                  <div className="table border-thin my-4">
                    <TableRow title="Lend With">
                      <CurrencyDropdown
                        currency={currency}
                        setCurrency={setCurrency}
                        tokensSubmitted={tokensSubmitted}
                      />
                    </TableRow>
                    <BR />
                    <TableRow title="Approve">
                      <SubmitApproveButton
                        loggedIn={loggedIn}
                        tokensSubmitted={tokensSubmitted}
                        setTokensSubmitted={setTokensSubmitted}
                      />
                    </TableRow>
                  </div>
                  {!loggedIn ? (
                    <Button
                      className="py-3 px-4 mt-2 text-lg "
                      variant="primary"
                      onClick={() => toggleLoginModal(true)}
                    >
                      Connect Wallet
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !loggedIn}
                      className={`py-3 px-4 mt-2 text-lg  ${
                        loggedIn ? " pointer" : "disabled"
                      }`}
                      variant="primary"
                      block
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
        <SuccessScreen link={trackingLink} />
      )}
    </div>
  );
};

export default Lend;
