import React, { useState, useContext } from "react";

import { DashboardContext } from "../../context/dashboardContext";

import SuccessScreen from "../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../ProcessingScreen/ProcessingScreen";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import BR from "../UI/BR";
import TableRow from "../UI/TableRow";
import PrimaryButton from "../UI/PrimaryButton";
import { loanWithdraw } from "../../actions/DashboardBorrowActions";

const BorrowWithdrawSubsection = () => {
  const [success, setSuccess] = useState(false);
  const [isWithdrawing, setWithdrawing] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const { loans } = useContext(DashboardContext);

  const withdraw = async () => {
    setWithdrawing(true);
    const res = await loanWithdraw();
    setWithdrawing(false);
    setSuccess(res);
  };

  return (
    <div>
      {success && (
        <SuccessScreen
          fullScreen={false}
          title="You're set!"
          onButtonClick={() => {
            setSuccess(false);
          }}
          message={<div>You’ve withdrawed your loan!</div>}
        />
      )}
      {isWithdrawing && (
        <ProcessingScreen link="" fullScreen={false} title="Withdrawing" />
      )}
      {!success && !isWithdrawing && selectedLoan && (
        <div>
          <div className="table border-thin mb-4 mt-3">
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
          </div>

          <div className="table border-thin mb-4 mt-3">
            <TableRow title="Add collateral">
              <CustomSubmenuLink
                title={`0 ${selectedLoan.collateralWith}`}
                onClickAction={() => {}}
              />
            </TableRow>
            <BR />
            <TableRow title="New collateral %">
              <div className="font-medium">-</div>
            </TableRow>
          </div>

          <div className="text-right mb-5">
            <u>View contract</u>
          </div>

          <div>
            <PrimaryButton text="Withdraw" onClick={() => withdraw()} />
          </div>
        </div>
      )}
      {!success && !isWithdrawing && !selectedLoan && (
        <div>
          <div className="text-gray">
            Select the loan you want to withdraw into
          </div>
          <div className="table border-thin mb-4 mt-3">
            {loans.map((loan: any) => {
              return (
                <div
                  key={loan.id}
                >
                  <TableRow
                    title={loan.status == "Repaid"?"Repaid":"Open"}
                  >
                    <CustomSubmenuLink
                      title={`${loan.collateralAmount} ${loan.collateralWith}`}
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
  );
};

export default BorrowWithdrawSubsection;
