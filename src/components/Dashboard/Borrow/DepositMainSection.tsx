import React, { useContext } from "react";

import {
  DashboardContext,
  BorrowDepositContext,
} from "../../../context/dashboardContext";

import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import BR from "../../UI/BR";
import TableRow from "../../UI/TableRow";
import PrimaryButton from "../../UI/PrimaryButton";
import { loanDeposit } from "../../../actions/DashboardBorrowActions";
import SubmenuCard from "../../UI/SubmenuCard";
import CustomInput from "../../UI/CustomInput";
import { LoanInterface } from "../../../context/types";
import ViewContractLink from "../ViewContractLink";
import {
  AppContext,
  BaseTokens,
  TellerState,
  TellerTokens,
} from "../../../context/app";
import { calculateCollateralPercent } from "../../../actions/HelperFunctions";
import eth from "../../../../dist/assets/eth-logo.svg";
import link from "../../../../dist/assets/link-logo.png";
import { BorrowPageContext } from "../../../context/borrowContext";

const DepositMainSection = () => {
  const { state } = useContext(AppContext);
  const { loans } = useContext(DashboardContext);
  const {
    setSuccess,
    setDepositing,
    selectedLoan,
    setSelectedLoan,
    addCollateralSubmenu,
    setAddCollateralSubmenu,
    collateral,
    setCollateral,
    setNewCollateralPercent,
    newCollateralPercent,
  } = useContext(BorrowDepositContext);
  const { borrowRequest } = useContext(BorrowPageContext);
  const { web3State } = state;
  const { loansInstance } = state.teller.contracts[BaseTokens.ETH][
    TellerTokens.tDAI
  ];

  const currentLoans = loans
    ? loans.filter((loan: any) => {
        return (
          loan.status != "Closed" && loan.totalCollateralDepositsAmount > 0
        );
      })
    : null;

  const deposit = async (id: string, amountToDeposit: number) => {
    setDepositing(true);
    if (process.env.INTEGRATIONS_DISABLED === "false") {
      await loanDeposit(
        loansInstance,
        id,
        borrowRequest.collateralWith,
        amountToDeposit,
        web3State
      );
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setCollateral(0);
    setNewCollateralPercent(0);
    setDepositing(false);
    setSuccess(true);
  };

  return (
    <div className="my-4">
      {selectedLoan &&
        (addCollateralSubmenu ? (
          <SubmenuCard
            title="Add collateral"
            onCloseAction={() => {
              setAddCollateralSubmenu(false);
            }}
          >
            <div className="d-flex flex-column align-items-center">
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
                  setCollateral(value);
                  const newCollateralPercent = calculateCollateralPercent(
                    state.tokenData,
                    {
                      ...selectedLoan,
                      collateralAmount:
                        selectedLoan.collateralAmount + parseFloat(value),
                    }
                  );
                  setNewCollateralPercent(newCollateralPercent);
                }}
                value={collateral.toString()}
                type="string"
                onBlur={(e: any) => {
                  let value = parseFloat(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setCollateral(value);
                }}
              />
              <div className="text-lightest-gray text-lg ">
                {newCollateralPercent || selectedLoan.currentCollateralPercent}%
              </div>
              <div
                className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
                onClick={() => {
                  setAddCollateralSubmenu(false);
                }}
              >
                Enter
              </div>
            </div>
          </SubmenuCard>
        ) : (
          <div>
            <div className="table border-thin mb-4 mt-3">
              <TableRow title="Liquidation %">
                <div className="font-medium">
                  {selectedLoan.terms.collateralRatio}%
                </div>
              </TableRow>
              <BR />
              <TableRow title="Collateral %">
                <div className="font-medium">
                  {Math.round(selectedLoan.currentCollateralPercent)}%
                </div>
              </TableRow>
              <BR />
              <TableRow title="Collateral amount">
                <div className="font-medium">
                  {selectedLoan.collateralAmount} {selectedLoan.collateralToken}
                </div>
              </TableRow>
            </div>

            <div className="table border-thin mb-4 mt-3">
              <TableRow title="Add collateral">
                <CustomSubmenuLink
                  title={`${collateral} ${selectedLoan.collateralToken}`}
                  onClickAction={() => {
                    setAddCollateralSubmenu(true);
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
            <ViewContractLink link={selectedLoan.transactionHash} />
            <div>
              <PrimaryButton
                text="Deposit"
                onClick={() => deposit(selectedLoan.id, collateral)}
              />
            </div>
          </div>
        ))}

      {!selectedLoan && (
        <div className="my-2">
          <div className="text-gray mb-4">
            Deposit additional collateral for an outstanding loan
          </div>
          <div className="table mb-4">
            {currentLoans &&
              currentLoans
                .map((loan: any) => {
                  loan.percentFromLiquidation =
                    loan.currentCollateralPercent - loan.terms.collateralRatio;
                  return loan;
                })
                .sort((a: any, b: any) => {
                  return a.percentFromLiquidation - b.percentFromLiquidation;
                })
                .map((loan: any, i: number) => {
                  const percentFromLiquidaton = loan.percentFromLiquidation;
                  const borderRadius =
                    i === 0
                      ? "4px 4px 0px 0px"
                      : i === currentLoans.length - 1
                      ? " 0px 0px 4px 4px"
                      : "0px";
                  const borderTop = i > 0 ? "none" : "1px solid #D7DAE2";
                  return (
                    <div
                      key={loan.id}
                      style={
                        Math.round(percentFromLiquidaton) < 0
                          ? {
                              border: "1px solid #FC5A5A",
                              borderRadius: `${borderRadius}`,
                              marginTop: "-1px",
                            }
                          : {
                              border: "1px solid #D7DAE2",
                              borderTop: `${borderTop}`,
                              borderRadius: `${borderRadius}`,
                            }
                      }
                    >
                      <TableRow
                        title={`${Math.round(
                          percentFromLiquidaton
                        )}% from liquidation`}
                      >
                        <CustomSubmenuLink
                          title={`${loan.collateralAmount.toFixed(2)} ${
                            loan.collateralToken
                          }`}
                          onClickAction={() => {
                            setSelectedLoan(loan);
                          }}
                        />
                      </TableRow>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositMainSection;
