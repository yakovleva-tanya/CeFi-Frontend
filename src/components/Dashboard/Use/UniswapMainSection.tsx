import React, { useContext, useState, useEffect } from "react";
import Card from "../../UI/Card";
import logo from "../../../../dist/assets/uniswap-logo.svg";
import { DashboardContext } from "../../../context/dashboardContext";
import { LoanInterface } from "../../../context/types";
import TableRow from "../../UI/TableRow";
import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import BR from "../../UI/BR";
import PrimaryButton from "../../UI/PrimaryButton";
import disabledArrow from "../../../../dist/assets/full-gray-arrow-down.svg";
import activeArrow from "../../../../dist/assets/full-primary-arrow-down.svg";
import { CustomDropdown } from "../../UI/CustomDropdown";
import repeatArrow from "../../../../dist/assets/repeat-arrows.svg";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import NumberInput from "../../UI/NumberInput";
import { AppContext } from "../../../context/app";
import { exchangeCurrency } from "../../../actions/HelperFunctions";

const UniswapLogo = () => {
  return <img className="mr-3" src={logo} height="31" />;
};

const UniswapMainSection = () => {
  const { state } = useContext(AppContext);
  const { tokenData, teller } = state;
  const { userWalletBalance } = teller;

  const { loans } = useContext(DashboardContext);
  const [selectedLoan, setSelectedLoan] = useState<null | LoanInterface>(null);
  const [success, setSuccess] = useState(false);
  const options = [
    "DAI",
    "SNX",
    "MKR",
    "LINK",
    "YFI",
    "LEND",
    "ETH",
    "wBTC",
    "USDT",
    "USDC",
  ];
  const [firstValue, setFirstValue] = useState({
    amount: "0.00",
    currency: options[0],
  });
  const [secondValue, setSecondValue] = useState({
    amount: "0.00",
    currency: options[1],
  });
  const [swapExchangeRate, setSwapExchangeRate] = useState(false);

  return (
    <Card
      dashboard={true}
      className="main-card text-center"
      title={selectedLoan ? `ID ${selectedLoan.id}` : "Uniswap"}
      logo={selectedLoan ? null : <UniswapLogo />}
      goBack={
        selectedLoan
          ? () => {
              setSelectedLoan(null);
            }
          : null
      }
    >
      {!success && !selectedLoan && (
        <div>
          <div>Earn interest by supplying to Uniswap.</div>
          <div className="table border-thin mb-4 mt-3">
            {loans &&
              loans.map((loan: LoanInterface) => {
                return (
                  <div key={loan.id}>
                    <TableRow title={`ID ${loan.id}`}>
                      <CustomSubmenuLink
                        title={`${loan.amountBorrowed} ${loan.token}`}
                        onClickAction={() => {
                          setSelectedLoan(loan);
                        }}
                      />
                    </TableRow>
                    <BR />
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {!success && selectedLoan && (
        <div className="d-flex flex-column">
          <div className="d-flex border-thin justify-content-between p-4 mt-3">
            <div className="d-flex flex-column align-items-start">
              <div className="text-lightest-gray mb-1">From</div>
              <NumberInput
                className="text-left text-lg font-medium"
                value={firstValue.amount}
                setValue={(value: string) => {
                  setFirstValue({ ...firstValue, amount: value });
                  let amount = exchangeCurrency(
                    parseFloat(value),
                    firstValue.currency,
                    tokenData,
                    secondValue.currency
                  );
                  if (isNaN(amount)) {
                    amount = 0;
                  }
                  setSecondValue({
                    ...secondValue,
                    amount: amount.toFixed(2),
                  });
                }}
              />
            </div>
            <div className="d-flex flex-column align-items-end">
              <div className="text-lightest-gray mb-1 font-medium">
                Balance: {userWalletBalance[firstValue.currency]}
              </div>
              <div className="d-flex flex-row align-items-center">
                <div
                  className="mr-4 py-1 px-2 border-thin text-lightest-gray pointer"
                  onClick={() => {
                    setFirstValue({
                      ...firstValue,
                      amount: userWalletBalance[firstValue.currency].toFixed(2),
                    });
                  }}
                >
                  Max
                </div>
                <CustomDropdown
                  options={options.filter((option) => {
                    return option != secondValue.currency;
                  })}
                  selected={firstValue.currency}
                  handleSelect={(value: string) => {
                    setFirstValue({
                      ...firstValue,
                      currency: value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <img height={14} src={disabledArrow} />
          </div>
          <div className="d-flex border-thin justify-content-between p-4 mt-2">
            <div className="d-flex flex-column align-items-start">
              <div className="text-lightest-gray mb-1">To</div>
              <NumberInput
                className="text-left text-lg font-medium"
                value={secondValue.amount}
                setValue={(value: string) => {
                  setSecondValue({ ...secondValue, amount: value });
                  let amount = exchangeCurrency(
                    parseFloat(value),
                    secondValue.currency,
                    tokenData,
                    firstValue.currency
                  );
                  if (isNaN(amount)) {
                    amount = 0;
                  }
                  setFirstValue({
                    ...firstValue,
                    amount: amount.toFixed(2),
                  });
                }}
              />
            </div>
            <div className="d-flex flex-column align-items-end">
              <div className="text-lightest-gray mb-1">
                Balance: {userWalletBalance[secondValue.currency]}
              </div>
              <CustomDropdown
                options={options.filter((option) => {
                  return option != firstValue.currency;
                })}
                selected={secondValue.currency}
                handleSelect={(value: string) => {
                  setSecondValue({ ...secondValue, currency: value });
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2 p-4">
            <div className="text-lightest-gray">Price</div>
            <div className="d-flex flex-row align-items-center">
              <div className="text-lightest-gray mr-1">{`${
                swapExchangeRate
                  ? (
                      tokenData[secondValue.currency].price /
                      tokenData[firstValue.currency].price
                    ).toFixed(4)
                  : (
                      tokenData[firstValue.currency].price /
                      tokenData[secondValue.currency].price
                    ).toFixed(4)
              } ${
                swapExchangeRate ? firstValue.currency : secondValue.currency
              } per ${
                swapExchangeRate ? secondValue.currency : firstValue.currency
              }`}</div>
              <img
                src={repeatArrow}
                height={14}
                className="pointer"
                onClick={() => {
                  setSwapExchangeRate(!swapExchangeRate);
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <PrimaryButton
              text="Swap"
              onClick={() => {
                setSuccess(true);
              }}
            />
          </div>
          <div className="p-4">
            <div className="d-flex justify-content-between">
              <div className="text-lightest-gray">Maximum sold</div>
              <div>401 {secondValue.currency}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-lightest-gray">Price Impact</div>
              <div>0.04%</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-lightest-gray">Liquidity Provider Fee</div>
              <div>0.034 {firstValue.currency}</div>
            </div>
          </div>
        </div>
      )}
      {success && (
        <SuccessScreen
          title="Transaction Submitted"
          onButtonClick={() => {
            setSuccess(false);
          }}
          message={
            <div>
              View transaction status{" "}
              <a
                className="link text-gray"
                target="_blank"
                rel="noreferrer"
                href="https://etherscan.io/tx/"
              >
                <u>here</u>.
              </a>
            </div>
          }
          CTA="Go back"
        />
      )}
    </Card>
  );
};
export default UniswapMainSection;
