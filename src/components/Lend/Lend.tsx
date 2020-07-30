import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import './lend.scss';

import Card from "../UI/Card";
import BR from "../UI/BR";
import Metric from '../UI/Metric';
import { Check } from 'react-bootstrap-icons';
import { AppContext, AppContextState } from "../../context/app";
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import lendDai from "./../../actions/lendDai";
import SuccessScreen from './../SuccessScreen/SuccessScreen';
import AssetChangeWarningModal from './../AssetChangeWarningModal/AssetChangeWarningModal';

type RatesType = {
  [key: string]: number,
};

const exchangeRates: RatesType = {
  USDT: 0.998,
  DAI: 1.033,
  USDC: 1.001
}
const convertCurrency = (currency: number, amount: number) => (amount / currency).toFixed(2);

const Lend = () => {
  const [currency, setCurrency] = useState('DAI');
  const [tempSelection, setTempSelection] = useState('');
  const [amount, setAmount] = useState(10);
  const [trackingLink, setTrackingLink] = useState(""); // should be assigned once lending processed
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [tokensSubmitted, setTokensSubmitted] = useState(false);
  const { state, updateAppState } = useContext(AppContext);
  const loggedIn = state.web3State?.address || "";
  const walletBalance = state.zeroCollateral?.balance ? state.zeroCollateral?.balance : "-";
  const hasWeb3 = state.web3State?.web3;
  const initialSupplyValues = { amount };
  const toggleLoginModal = (show: boolean) => updateAppState((st: AppContextState) => ({ ...st, loginModal: { show } }));
  const handleSelect = (eventKey: any, e?: React.SyntheticEvent<{}>) => {
    if (tokensSubmitted) {
      setTempSelection(eventKey)
      setShowWarningModal(true)
    } else {
      setCurrency(eventKey)
    }
  }
  const cancelChange = () => {
    setShowWarningModal(false)
  }
  const proceedWithChange = () => {
    setShowWarningModal(false);
    setCurrency(tempSelection)
  }

  return (
    <div> {!trackingLink ?
      <div className="cards-container">
        <AssetChangeWarningModal show={showWarningModal} proceed={proceedWithChange} cancel={cancelChange} />
        <Card className="flex-2 text-center align-items-center" title="Lend" >
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
                      onChange={e => { handleChange(e); setAmount(parseInt(e.target.value)) }}
                      value={values.amount}
                    />
                    <div className="text-lightest-gray text-lg" >{`${convertCurrency(exchangeRates[currency], amount)} ${currency}`}
                    </div>
                  </div>
                  <div className="table border-thin my-4">
                    <div className="d-flex flex-row justify-content-between p-3 m-x-auto">
                      <div className="p-1">Lend With</div>
                      <Dropdown>
                        <Dropdown.Toggle variant="link" id="toggle" className="dropdown font-medium p-1 text-gray" >
                          {`${currency}   `}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="DAI" onSelect={handleSelect}>DAI</Dropdown.Item>
                          <Dropdown.Item eventKey="USDT" onSelect={handleSelect}>USDT</Dropdown.Item>
                          <Dropdown.Item eventKey="USDC" onSelect={handleSelect}>USDC</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <BR />
                    <div className="d-flex flex-row justify-content-between p-3">
                      <div className="p-1">Approve</div>
                      <div className="d-flex flex-row align-items-center">
                        <div className={`py-1 px-3 border-thin  ${loggedIn ? "pointer" : "disabled"}`} onClick={() => { if (loggedIn) { setTokensSubmitted(true) } }}>Submit</div>
                        <Check className={`${tokensSubmitted ? `text-green` : `text-lightest-gray`} text-lg ml-2`} size={24} />
                      </div>
                    </div>
                  </div>
                  {!loggedIn ?
                    <Button className="py-3 px-4 mt-2 text-lg " variant="primary" onClick={() => toggleLoginModal(true)}> Connect Wallet </Button> :
                    <Button type="submit" disabled={isSubmitting || !hasWeb3} className={`py-3 px-4 mt-2 text-lg  ${loggedIn ? " pointer" : "disabled"}`} variant="primary" block>Supply</Button>
                  }
                </Form>
              )}
          </Formik>
        </Card >
        <Card className='flex-1' title="Metrics">
          <Metric title="Supply APY" value="8.40%" />
          <Metric title={`Price - ${currency}`} value={`$ ${exchangeRates[currency]}`} />
          <Metric title="Wallet" value={walletBalance.toString()} />
        </Card>
      </div > :
      <SuccessScreen link={trackingLink} />}
    </div>
  )
}
export default Lend;

const completeLendingForm = (state: any, updateAppState: Function) => async (values: any, { setSubmitting }: any) => {
  const amount = values.amount;
  const primaryAddress = state.web3State.address;
  const { lendingPool, zDai } = state.zeroCollateral.contracts;
  try {
    const balance = await lendDai(amount, primaryAddress, lendingPool, zDai, state.web3State);
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
        message: "An error occurred during the lending process. Please try again.",
        title: "Error"
      };
      return { ...st, errorModal };
    });
  }
};

const supplyFormValidation = () => {
  const errors = {};
  return errors;
};


