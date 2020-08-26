import React from "React";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";

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

  LOANS.map((loan) => {
    if (loan.amountOwed === 0) {
      repaidLoans.push(loan);
    } else if (currentTime > loan.due) {
      overdueLoans.push(loan);
    } else {
      outstandingLoans.push(loan);
    }
  });

  return (
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
                      onClickAction={() => {}}
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
                      onClickAction={() => {}}
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
                      onClickAction={() => {}}
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
  );
};

export default BorrowRepaySubsection;
