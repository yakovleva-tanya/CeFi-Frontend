import React, { useContext, useState } from "react";
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
import { MockDropdown } from "../../UI/CustomDropdown";
import repeatArrow from "../../../../dist/assets/repeat-arrows.svg";
import SuccessScreen from "../../SuccessScreen/SuccessScreen";

const UniswapLogo = () => {
  return <img className="mr-3" src={logo} height="31" />;
};

const UniswapMainSection = () => {
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
            {loans.map((loan: LoanInterface) => {
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
              <div className="text-xl font-medium">0.00</div>
            </div>
            <div className="d-flex flex-column align-items-end">
              <div className="text-lightest-gray mb-1 font-medium">
                Balance:3.45
              </div>
              <MockDropdown options={options} />
            </div>
          </div>
          <div className="mt-2">
            <img height={14} src={disabledArrow} />
          </div>
          <div className="d-flex border-thin justify-content-between p-4 mt-2">
            <div className="d-flex flex-column align-items-start">
              <div className="text-lightest-gray mb-1">To</div>
              <div className="text-xl font-medium">0.23</div>
            </div>
            <div className="d-flex flex-column align-items-end">
              <div className="text-lightest-gray mb-1">Balance:3.45</div>
              <MockDropdown options={options} />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2 p-4">
            <div className="text-lightest-gray">Price</div>
            <div className="d-flex flex-row align-items-center">
              <div className="text-lightest-gray mr-1">400 DAI per ETH</div>
              <img src={repeatArrow} height={14} className="pointer" />
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
              <div>401 DAI</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-lightest-gray">Price Impact</div>
              <div>0.04%</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-lightest-gray">Liquidity Provider Fee</div>
              <div>0.034 DAI</div>
            </div>
          </div>
        </div>
      )}
      {success && (
        <SuccessScreen
          fullScreen = {false}
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
