import React, { useState } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import PrimaryButton from "../UI/PrimaryButton";
import { repayLoan } from "../../actions/DashboardBorrowActions";
import SuccessScreen from "../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../ProcessingScreen/ProcessingScreen";
import FormValidationWarning from "../UI/FormValidationWarning";

//TODO: get real values
const LOANS = [
  {
    interestRate: 50,
    loanSize: 109,
    lendWith: "DAI",
    loanTerm: 1,
    loanType: "Fixed",
    liquidation: 100,
    collateralWith: "ETH",
    collateralAmount: 100,
    collateralPercent: 150,
    due: 1599951940049,
    amountOwed: 10,
    id: "1243",
  },
  {
    interestRate: 50,
    loanSize: 150,
    lendWith: "DAI",
    loanTerm: 1,
    loanType: "Fixed",
    liquidation: 100,
    collateralWith: "ETH",
    collateralAmount: 100,
    collateralPercent: 150,
    due: 1598159140049,
    amountOwed: 0,
    id: "2343",
  },
  {
    interestRate: 50,
    loanSize: 1140,
    lendWith: "DAI",
    loanTerm: 1,
    loanType: "Fixed",
    liquidation: 100,
    collateralWith: "ETH",
    collateralAmount: 100,
    collateralPercent: 150,
    due: 1598553990049,
    amountOwed: 100,
    id: "4643",
  },
  {
    interestRate: 50,
    loanSize: 100,
    lendWith: "DAI",
    loanTerm: 1,
    loanType: "Fixed",
    liquidation: 100,
    collateralWith: "ETH",
    collateralAmount: 100,
    collateralPercent: 150,
    status: "outstanding",
    due: 1598252890049,
    amountOwed: 10,
    id: "473",
  },
  {
    interestRate: 20,
    loanSize: 10,
    lendWith: "DAI",
    loanTerm: 5,
    loanType: "Fixed",
    liquidation: 10,
    collateralWith: "ETH",
    collateralAmount: 130,
    collateralPercent: 250,
    status: "outstanding",
    due: 1598252990049,
    amountOwed: 0,
    id: "876",
  },
];

const BorrowRepaySubsection = () => {
  const overdueLoans: any = [];
  const outstandingLoans: any = [];
  const repaidLoans: any = [];
  const currentTime = Date.now();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isRepaying, setRepaying] = useState(false);
  const [success, setSuccess] = useState(false);

  LOANS.map((loan) => {
    if (loan.amountOwed === 0) {
      loan.status = "Repaid";
      repaidLoans.push(loan);
    } else if (currentTime > loan.due) {
      loan.status = "Overdue";
      overdueLoans.push(loan);
    } else {
      loan.status = "Outstanding";
      outstandingLoans.push(loan);
    }
  });

  const onRepayLoan = async (id: string) => {
    setRepaying(true);
    setSelectedLoan(null);
    const res = await repayLoan(id);
    setRepaying(false);
    setSuccess(res);
  };
  return (
    <div>
      {success && (
        <SuccessScreen
          link=""
          version="repay"
          fullScreen={false}
          onButtonClick={() => {
            setSuccess(false);
          }}
        />
      )}
      {isRepaying && (
        <ProcessingScreen link="" title="Repaying" fullScreen={false} />
      )}
      {!selectedLoan && !success && !isRepaying && (
        <div>
          {outstandingLoans.length > 0 && (
            <div className="mb-4">
              <div className="text-left">Outstanding loans</div>
              <div className="table border-thin mb-4 mt-3">
                {outstandingLoans.map((loan: any) => {
                  return (
                    <div key={loan.due}>
                      <TableRow
                        title={`${Math.round(
                          (loan.due - currentTime) / (60 * 60 * 24 * 1000)
                        )} days remaining`}
                      >
                        <CustomSubmenuLink
                          title={`${loan.loanSize} ${loan.lendWith}`}
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
          {overdueLoans.length > 0 && (
            <div className="mb-4">
              <div className="text-left">Overdue loans</div>
              <div className="table border-thin mb-4 mt-3">
                {overdueLoans.map((loan: any) => {
                  return (
                    <div key={loan.due}>
                      <TableRow
                        title={`${Math.round(
                          (currentTime - loan.due) / (60 * 60 * 24 * 1000)
                        )} days overdue`}
                      >
                        <CustomSubmenuLink
                          title={`${loan.loanSize} ${loan.lendWith}`}
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
          {repaidLoans.length > 0 && (
            <div className="mb-4">
              <div className="text-left">Repaid loans</div>
              <div className="table border-thin mb-4 mt-3">
                {repaidLoans.map((loan: any) => {
                  return (
                    <div key={loan.due}>
                      <TableRow title={`ID ${loan.id}`}>
                        <CustomSubmenuLink
                          title={`${loan.loanSize} ${loan.lendWith}`}
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
        </div>
      )}
      {selectedLoan && (
        <div>
          <div
            className="border-thin pointer"
            onClick={() => {
              setSelectedLoan(null);
            }}
          >
            Go Back
          </div>
          <div className="table border-thin mb-4 mt-3">
            <TableRow title="Interest Rate">
              <div className="font-medium">{selectedLoan.interestRate}%</div>
            </TableRow>
            <BR />
            <TableRow title="Loan size">
              <div className="font-medium">
                {selectedLoan.loanSize} {selectedLoan.lendWith}
              </div>
            </TableRow>
            <BR />
            <TableRow title="Loan term">
              <div className="font-medium">{selectedLoan.loanTerm} Days</div>
            </TableRow>
            <BR />
            <TableRow title="Loan type">
              <div className="font-medium">{selectedLoan.loanType}</div>
            </TableRow>
            <BR />
            <TableRow title="Liquidation %">
              <div className="font-medium">{selectedLoan.liquidation}%</div>
            </TableRow>
            <BR />
            <TableRow title="Collateral %">
              <div className="font-medium">
                {selectedLoan.collateralPercent}%
              </div>
            </TableRow>
            <BR />
            <TableRow title="Collateral amount">
              <div className="font-medium">
                {selectedLoan.collateralAmount} {selectedLoan.collateralWith}
              </div>
            </TableRow>
            <BR />
          </div>

          <div className="table border-thin mb-4 mt-3">
            <TableRow title="Status">
              <div className="font-medium">{selectedLoan.status}</div>
            </TableRow>
            <BR />
            {selectedLoan.status !== "Repaid" && (
              <div>
                <TableRow title="Time remaining">
                  {selectedLoan.status === "Overdue" && (
                    <div className="font-medium">
                      {Math.round(
                        (currentTime - selectedLoan.due) / (60 * 60 * 24 * 1000)
                      )}{" "}
                      days overdue
                    </div>
                  )}
                  {selectedLoan.status === "Outstanding" && (
                    <div className="font-medium">
                      {Math.round(
                        (selectedLoan.due - currentTime) / (60 * 60 * 24 * 1000)
                      )}{" "}
                      days remaining
                    </div>
                  )}
                </TableRow>
                <BR />
              </div>
            )}
            <TableRow title="Amount owed">
              <div className="font-medium">
                {selectedLoan.amountOwed} {selectedLoan.lendWith}
              </div>
            </TableRow>
            <BR />
          </div>
          <div className="text-right mb-5">
            <u>View contract</u>
          </div>
          {selectedLoan.status !== "Repaid" && (
            <div>
              <FormValidationWarning message="Withdraw assets from Compound and/or sell on Uniswap." />
              <PrimaryButton
                text="Repay Loan"
                onClick={() => onRepayLoan(selectedLoan.id)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BorrowRepaySubsection;
