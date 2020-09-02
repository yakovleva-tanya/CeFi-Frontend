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

const DepositMainSection = () => {
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
  } = useContext(BorrowDepositContext);

  const currentLoans = loans.filter((loan: any) => {
    return loan.status != "repaid";
  });

  const deposit = async () => {
    setDepositing(true);
    await loanDeposit();
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
            <div className="d-flex flex-column">
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
              <div className="text-lightest-gray text-lg ">140%</div>
              <div
                className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
                onClick={() => {
                  setAddCollateralSubmenu(false);
                }}
              >
                Submit
              </div>
            </div>
          </SubmenuCard>
        ) : (
          <div>
            <div className="table border-thin mb-4 mt-3">
              <TableRow title="Liquidation %">
                <div className="font-medium">-%</div>
              </TableRow>
              <BR />
              <TableRow title="Collateral %">
                <div className="font-medium">-%</div>
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
                <div className="font-medium">-</div>
              </TableRow>
            </div>

            <div className="text-right mb-5">
              <u>View contract</u>
            </div>

            <div>
              <PrimaryButton text="Deposit" onClick={() => deposit()} />
            </div>
          </div>
        ))}

      {!selectedLoan && (
        <div>
          <div className="text-gray">
            Select the loan you want to deposit into
          </div>
          <div className="table border-thin mb-4 mt-3">
            {currentLoans.map((loan: LoanInterface) => {
              return (
                <div
                  key={loan.id}
                  // style={
                  //   loan.percentFromLiquidation < 0
                  //     ? { border: "1px solid #FC5A5A" }
                  //     : {}
                  // }
                >
                  <TableRow title={`-%  from liquidation`}>
                    <CustomSubmenuLink
                      title={`- ${loan.collateralToken}`}
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
