import React, { useContext, useState } from "react";

import {
  DashboardContext,
  BorrowWithdrawContext,
} from "../../../context/dashboardContext";

import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import BR from "../../UI/BR";
import TableRow from "../../UI/TableRow";
import PrimaryButton from "../../UI/PrimaryButton";
import { loanWithdraw } from "../../../actions/DashboardBorrowActions";
import SubmenuCard from "../../UI/SubmenuCard";
import CustomInput from "../../UI/CustomInput";
import { LoanInterface } from "../../../context/types";
import ViewContractLink from "../ViewContractLink";
import { AppContext } from "../../../context/app";
import {
  calculateCollateralPercent,
  getMaxWithdrawAmount,
} from "../../../actions/HelperFunctions";
import FormValidationWarning from "../../UI/FormValidationWarning";

const WithdrawMainSection = () => {
  const [warning, setWarning] = useState("");
  const { state } = useContext(AppContext);
  const { loans } = useContext(DashboardContext);
  const {
    setSuccess,
    setWithdrawing,
    selectedLoan,
    setSelectedLoan,
    withdrawCollateralSubmenu,
    setWithdrawCollateralSubmenu,
    withdrawAmount,
    setWithdrawAmount,
    setNewCollateralPercent,
    newCollateralPercent,
  } = useContext(BorrowWithdrawContext);

  const withdraw = async () => {
    setWithdrawing(true);
    const res = await loanWithdraw();
    setWithdrawing(false);
    setSuccess(res);
  };

  const getExpuryDateString = (date: number) => {
    const expiryDate = new Date(date);
    return expiryDate.toLocaleDateString();
  };
  let maxWithdrawAmount = 0;
  if (selectedLoan) {
    maxWithdrawAmount = getMaxWithdrawAmount(state.tokenData, selectedLoan);
    console.log(maxWithdrawAmount);
  }
  return (
    <div>
      {selectedLoan &&
        (withdrawCollateralSubmenu ? (
          <SubmenuCard
            title="Withdraw collateral"
            onCloseAction={() => {
              setWithdrawCollateralSubmenu(false);
            }}
          >
            <div className="d-flex flex-column">
              <FormValidationWarning message={warning} />
              <CustomInput
                onChangeFunction={(e: any) => {
                  let value = e.target.value.replace(/[^0-9.]/g, "");
                  const split = value.split(".");
                  if (split[1] && split[1].length > 2) {
                    value = `${split[0]}.${split[1].substring(0, 2)}`;
                  }
                  if (isNaN(value)) {
                    value = "0.00";
                  }
                  if (value > maxWithdrawAmount) {
                    setWarning(
                      `You cannot withdraw more than ${maxWithdrawAmount} ${selectedLoan.collateralToken}`
                    );
                  } else {
                    setWarning("");
                  }
                  setWithdrawAmount(value);
                  const newCollateralPercent = calculateCollateralPercent(
                    state.tokenData,
                    {
                      ...selectedLoan,
                      collateralAmount:
                        selectedLoan.collateralAmount - parseFloat(value),
                    }
                  );
                  setNewCollateralPercent(newCollateralPercent);
                }}
                value={withdrawAmount.toString()}
                type="string"
                onBlur={(e: any) => {
                  let value = parseFloat(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  if (value > maxWithdrawAmount) {
                    value = maxWithdrawAmount;
                    const newCollateralPercent = calculateCollateralPercent(
                      state.tokenData,
                      {
                        ...selectedLoan,
                        collateralAmount: maxWithdrawAmount,
                      }
                    );
                    setNewCollateralPercent(newCollateralPercent);
                  }
                  setWithdrawAmount(value);
                }}
              />
              <div className="text-lightest-gray text-lg ">
                {newCollateralPercent || selectedLoan.currentCollateralPercent}%
              </div>
              <div
                className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
                onClick={() => {
                  setWithdrawCollateralSubmenu(false);
                }}
              >
                Submit
              </div>
            </div>
          </SubmenuCard>
        ) : (
          <div>
            {selectedLoan.status === "Closed" && (
              <div className="table border-thin mb-4 mt-3">
                <TableRow title="Status">
                  <div className="font-medium">{selectedLoan.statusName}</div>
                </TableRow>
                <BR />
                <TableRow title="Loan Expiration">
                  <div className="font-medium">
                    {getExpuryDateString(selectedLoan.terms.expiryAt)}
                  </div>
                </TableRow>
                <BR />
                <TableRow title="Collateral amount">
                  <div className="font-medium">
                    {selectedLoan.totalCollateralDepositsAmount}{" "}
                    {selectedLoan.collateralToken}
                  </div>
                </TableRow>
              </div>
            )}
            {selectedLoan.status !== "Closed" && (
              <div>
                <div className="table border-thin mb-4 mt-3">
                  <TableRow title="Liquidation %">
                    <div className="font-medium">
                      {selectedLoan.terms.collateralRatio}%
                    </div>
                  </TableRow>
                  <BR />
                  <TableRow title="Current Collateral %">
                    <div className="font-medium">
                      {selectedLoan.currentCollateralPercent.toFixed(2)} %
                    </div>
                  </TableRow>
                  <BR />
                  <TableRow title="Collateral amount">
                    <div className="font-medium">
                      {selectedLoan.totalCollateralDepositsAmount}{" "}
                      {selectedLoan.collateralToken}
                    </div>
                  </TableRow>
                </div>
                <div className="table border-thin mb-4 mt-3">
                  <TableRow title="Withdraw collateral">
                    <CustomSubmenuLink
                      title={`${withdrawAmount} ${selectedLoan.collateralToken}`}
                      onClickAction={() => {
                        setWithdrawCollateralSubmenu(true);
                      }}
                    />
                  </TableRow>
                  <BR />
                  <TableRow title="New collateral %">
                    <div className="font-medium">
                      {newCollateralPercent ? `${newCollateralPercent}%` : "-"}
                    </div>
                  </TableRow>
                </div>
              </div>
            )}
            <ViewContractLink link={selectedLoan.transactionHash} />
            <div>
              <PrimaryButton text="Withdraw" onClick={() => withdraw()} />
            </div>
          </div>
        ))}
      {!selectedLoan && (
        <div>
          <div className="text-gray">
            Select the loan you want to withdraw into
          </div>
          <div className="table border-thin mb-4 mt-3">
            {loans.map((loan: LoanInterface) => {
              if (loan.status !== "Closed") {
                return;
              }
              return (
                <div key={loan.id}>
                  <TableRow title="Repaid">
                    <CustomSubmenuLink
                      title={`${loan.totalCollateralDepositsAmount} ${loan.collateralToken}`}
                      onClickAction={() => {
                        setSelectedLoan(loan);
                      }}
                    />
                  </TableRow>
                  <BR />
                </div>
              );
            })}
            {loans.map((loan: any) => {
              if (loan.status === "Closed") {
                return;
              }
              return (
                <div key={loan.id}>
                  <TableRow title="Open">
                    <CustomSubmenuLink
                      title={`${loan.totalCollateralDepositsAmount} ${loan.collateralToken}`}
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
export default WithdrawMainSection;
