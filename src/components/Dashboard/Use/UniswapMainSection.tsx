import React, { useContext } from "react";

import Card from "../../UI/Card";
import logo from "../../../../dist/assets/uniswap-logo.svg";
import UniswapForm from "./UniswapForm";
import UniswapSuccessScreen from "./UniswapSuccessScreen";
import UniswapLoansList from "./UniswapLoansList";

import { UniswapContext } from "../../../context/uniswapContext";
import SubmenuCard from "../../UI/SubmenuCard";
import CurrencyIcon from "../../UI/CurrencyIcon";
import { AppContext } from "../../../context/app";

const UniswapLogo = () => {
  return <img className="mr-3" src={logo} height="31" />;
};

const UniswapMainSection = () => {
  const {
    selectedLoan,
    setSelectedLoan,
    success,
    tokenSelectionDropdown,
  } = useContext(UniswapContext);

  const title = selectedLoan ? `ID ${selectedLoan.id}` : "Uniswap";
  const logo = selectedLoan ? null : <UniswapLogo />;
  const goBack = selectedLoan
    ? () => {
        setSelectedLoan(null);
      }
    : null;

  return (
    <Card
      dashboard={true}
      className="main-card text-center"
      title={title}
      logo={logo}
      goBack={goBack}
    >
      {!success && !selectedLoan && <UniswapLoansList />}
      {!success && selectedLoan && (
        <div>
          {tokenSelectionDropdown ? <UniswapTokenDropdown /> : <UniswapForm />}
        </div>
      )}
      {success && <UniswapSuccessScreen />}
    </Card>
  );
};

export default UniswapMainSection;

const UniswapTokenDropdown = () => {
  const {
    tokenSelectionDropdown,
    setTokenSelectionDropdown,
    values,
    setValues,
  } = useContext(UniswapContext);
  const { tokens } = tokenSelectionDropdown;
  const { state } = useContext(AppContext);
  const { teller } = state;
  const { userWalletBalance } = teller;

  return (
    <SubmenuCard
      title="Select a token"
      onCloseAction={() => {
        setTokenSelectionDropdown(null);
      }}
      className=""
    >
      {tokens.map((token: string) => {
        const balance = userWalletBalance
          ? userWalletBalance[token].toFixed(2)
          : "-";
        return (
          <div
            key={token}
            className="text-lg font-medium d-flex flex-row justify-content-between align-items-center mb-4 pointer"
            onClick={() => {
              const newValues = { ...values };
              if (tokenSelectionDropdown.type === "First") {
                newValues.input.token = token;
              } else {
                newValues.output.token = token;
              }
              setValues(newValues);
              setTokenSelectionDropdown(null);
            }}
          >
            <div className="d-flex flex-row align-items-center">
              <CurrencyIcon currency={token} className="mr-2" />
              <div>{token}</div>
            </div>
            <div>{balance}</div>
          </div>
        );
      })}
    </SubmenuCard>
  );
};
