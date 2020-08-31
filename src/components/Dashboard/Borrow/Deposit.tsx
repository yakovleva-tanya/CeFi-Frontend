import React, { useState, useContext } from "react";

import { DashboardContext } from "../../../context/dashboardContext";

import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import BR from "../../UI/BR";
import TableRow from "../../UI/TableRow";
import PrimaryButton from "../../UI/PrimaryButton";
import { loanDeposit } from "../../../actions/DashboardBorrowActions";
import SubmenuCard from "../../UI/SubmenuCard";
import CustomInput from "../../UI/CustomInput";

const Deposit = () => {
  const [success, setSuccess] = useState(false);
  const [isDepositing, setDepositing] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const { loans } = useContext(DashboardContext);
  const [addCollateralSubmenu, setAddCollateralSubmenu] = useState(false);

  const [collateral, setCollateral] = useState(
    selectedLoan ? selectedLoan.collateralAmount : 0
  );

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
      {success && (
        <SuccessScreen
          fullScreen={false}
          title="You're set!"
          onButtonClick={() => {
            setSuccess(false);
          }}
          message={<div>You’ve deposited your loan!</div>}
        />
      )}

      {isDepositing && (
        <ProcessingScreen link="" fullScreen={false} title="Depositing" />
      )}

      {!success && !isDepositing && (
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
                    <div className="font-medium">
                      {selectedLoan.liquidation}%
                    </div>
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
                      {selectedLoan.collateralAmount}{" "}
                      {selectedLoan.collateralWith}
                    </div>
                  </TableRow>
                </div>

                <div className="table border-thin mb-4 mt-3">
                  <TableRow title="Add collateral">
                    <CustomSubmenuLink
                      title={`${collateral} ${selectedLoan.collateralWith}`}
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
                {currentLoans.map((loan: any) => {
                  return (
                    <div
                      key={loan.id}
                      style={
                        loan.percentFromLiquidation < 0
                          ? { border: "1px solid #FC5A5A" }
                          : {}
                      }
                    >
                      <TableRow
                        title={`${loan.percentFromLiquidation}%  from liquidation`}
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
      )}
    </div>
  );
};

export default Deposit;
