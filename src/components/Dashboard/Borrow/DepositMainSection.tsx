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
  TellerTokens
} from "../../../context/app";
import { calculateCollateralPercent } from "../../../actions/HelperFunctions";
import eth from "../../../../dist/assets/eth-logo.svg";
import link from "../../../../dist/assets/link-logo.png";

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
  const { web3State } = state;
  const{ loansInstance } = state.teller.contracts[BaseTokens.ETH][
    TellerTokens.tDAI
  ];

  const currentLoans = loans.filter((loan: any) => {
    return loan.status != "repaid";
  });

  const deposit = async (
    id: string,
    amountToDeposit: number
  ) => {
    setDepositing(true);
    await loanDeposit(
      loansInstance,
      id,
      amountToDeposit,
      web3State
    );
    setDepositing(false);
    setSuccess(true);
  };

  return (
    <div>
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
              <TableRow title="Current collateral %">
                <div className="font-medium">
                  {selectedLoan.currentCollateralPercent.toFixed(2)}%
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
              <PrimaryButton text="Deposit" onClick={() => deposit(selectedLoan.id, collateral)} />
            </div>
          </div>
        ))}

      {!selectedLoan && (
        <div>
          <div className="text-gray">
            Deposit additional collateral for an outstanding loan
          </div>
          <div className="table border-thin mb-4 mt-3">
            {currentLoans.map((loan: LoanInterface) => {
              const percentFromLiquidaton =
                loan.currentCollateralPercent - loan.terms.collateralRatio;
              return (
                <div
                  key={loan.id}
                  style={
                    Math.round(percentFromLiquidaton) < 0
                      ? { border: "1px solid #FC5A5A" }
                      : {}
                  }
                >
                  <TableRow
                    title={`${Math.round(
                      percentFromLiquidaton
                    )}%  from liquidation`}
                  >
                    <CustomSubmenuLink
                      title={`${loan.collateralAmount} ${loan.collateralToken}`}
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

export default DepositMainSection;
