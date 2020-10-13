import React, { useContext, useState, useMemo } from "react";

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
import { AppContext, TellerTokens, BaseTokens } from "../../../context/app";
import {
  calculateCollateralPercent,
  getMaxWithdrawAmount,
} from "../../../actions/HelperFunctions";
import FormValidationWarning from "../../UI/FormValidationWarning";

import eth from "../../../../dist/assets/eth-logo.svg";
import link from "../../../../dist/assets/link-logo.png";

import { withdrawCollateral } from "../../../models/LoansInterfaceContract";
import copy from "../../../copy.json";

const WithdrawMainSection = () => {
  const [warning, setWarning] = useState("");
  const { state } = useContext(AppContext);
  const { loans } = useContext(DashboardContext);

  const filteredLoans = useMemo(() => {
    if (loans)
      return loans.filter((loan: LoanInterface) => {
        return loan.collateralAmount !== 0;
      });
    else {
      return null;
    }
  }, [loans]);

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
  const { web3State } = state;
  const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
    TellerTokens.tDAI
  ];

  const withdraw = async (id: string, amountToWithdraw: number) => {
    setWithdrawing(true);
    let res;
    if (process.env.INTEGRATIONS_DISABLED === "false") {
      res = await loanWithdraw(loansInstance, id, amountToWithdraw, web3State);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      res = true;
    }
    setWithdrawAmount(0);
    setNewCollateralPercent(0);
    setWithdrawing(false);
    setSuccess(res);
  };

  const getExpiryDateString = (date: number) => {
    const expiryDate = new Date(date);
    return expiryDate.toLocaleDateString();
  };
  let maxWithdrawAmount = 0;
  if (selectedLoan) {
    maxWithdrawAmount = getMaxWithdrawAmount(state.tokenData, selectedLoan);
  }
  const { description, header } = copy.pages.dashboard["borrow-withdraw"];

  return (
    <div className="my-4">
      {selectedLoan &&
        (withdrawCollateralSubmenu ? (
          <SubmenuCard
            title={header}
            onCloseAction={() => {
              setWithdrawCollateralSubmenu(false);
            }}
          >
            <div className="d-flex flex-column align-items-center">
              <FormValidationWarning message={warning} />
              {selectedLoan.collateralToken === "LINK" && (
                <img className="my-2" src={link} height="20" width="20" />
              )}
              {selectedLoan.collateralToken === "ETH" && (
                <img className="my-2" src={eth} height="20" width="20" />
              )}
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
                        collateralAmount:
                          selectedLoan.collateralAmount - maxWithdrawAmount,
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
                Enter
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
                    {getExpiryDateString(selectedLoan.terms.expiryAt)}
                  </div>
                </TableRow>
                <BR />
                <TableRow title="Collateral amount">
                  <div className="font-medium">
                    {selectedLoan.collateralAmount}{" "}
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
                      {Math.round(selectedLoan.currentCollateralPercent)} %
                    </div>
                  </TableRow>
                  <BR />
                  <TableRow title="Collateral amount">
                    <div className="font-medium">
                      {selectedLoan.collateralAmount}{" "}
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
                      {newCollateralPercent
                        ? `${Math.round(newCollateralPercent)}%`
                        : "-"}
                    </div>
                  </TableRow>
                </div>
              </div>
            )}
            <ViewContractLink link={selectedLoan.transactionHash} />
            <div>
              <PrimaryButton
                text="Withdraw"
                onClick={() => {
                  let amount = withdrawAmount;
                  if (selectedLoan.status === "Closed") {
                    amount = selectedLoan.collateralAmount;
                  }
                  withdraw(selectedLoan.id, amount);
                }}
              />
            </div>
          </div>
        ))}
      {!selectedLoan && (
        <div className="my-2">
          <div className="text-gray mb-4">{description}</div>
          <div className="table border-thin mb-4 mt-3">
            {filteredLoans &&
              filteredLoans
                .sort((a: any, b: any) => {
                  return b.status - a.status;
                })
                .map((loan: any, i: number) => {
                  return (
                    <div key={loan.id}>
                      <TableRow
                        title={loan.status === "Closed" ? "Repaid" : "Open"}
                      >
                        <CustomSubmenuLink
                          title={`${loan.collateralAmount} ${loan.collateralToken}`}
                          onClickAction={() => {
                            setSelectedLoan(loan);
                          }}
                        />
                      </TableRow>
                      {i !== filteredLoans.length - 1 && <BR />}
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
