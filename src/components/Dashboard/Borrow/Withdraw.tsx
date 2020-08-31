import React, { useState, useContext } from "react";

import { DashboardContext } from "../../../context/dashboardContext";

import SuccessScreen from "../../SuccessScreen/SuccessScreen";
import ProcessingScreen from "../../ProcessingScreen/ProcessingScreen";
import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import BR from "../../UI/BR";
import TableRow from "../../UI/TableRow";
import PrimaryButton from "../../UI/PrimaryButton";
import {
  loanWithdraw,
  loanDeposit,
} from "../../../actions/DashboardBorrowActions";
import SubmenuCard from "../../UI/SubmenuCard";
import CustomInput from "../../UI/CustomInput";

const Withdraw = () => {
  const [success, setSuccess] = useState(false);
  const [isWithdrawing, setWithdrawing] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const { loans } = useContext(DashboardContext);
  const [withdrawCollateralSubmenu, setWithdrawCollateralSubmenu] = useState(
    false
  );
  const [withdrawAmount, setWithdrawAmount] = useState(0);

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
      {!success && !isWithdrawing && (
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
                      setWithdrawAmount(value);
                    }}
                    value={withdrawAmount.toString()}
                    type="string"
                    onBlur={(e: any) => {
                      let value = parseFloat(e.target.value);
                      if (isNaN(value)) {
                        value = 0;
                      }
                      setWithdrawAmount(value);
                    }}
                  />
                  <div className="text-lightest-gray text-lg ">140%</div>
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

                {selectedLoan.status !== "Repaid" && (
                  <div className="table border-thin mb-4 mt-3">
                    <TableRow title="Withdraw collateral">
                      <CustomSubmenuLink
                        title={`${withdrawAmount} ${selectedLoan.collateralWith}`}
                        onClickAction={() => {
                          setWithdrawCollateralSubmenu(true);
                        }}
                      />
                    </TableRow>
                    <BR />
                    <TableRow title="New collateral %">
                      <div className="font-medium">-</div>
                    </TableRow>
                  </div>
                )}

                <div className="text-right mb-5">
                  <u>View contract</u>
                </div>
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
                {loans.map((loan: any) => {
                  if (loan.status !== "Repaid") {
                    return;
                  }
                  return (
                    <div key={loan.id}>
                      <TableRow title="Repaid">
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
                {loans.map((loan: any) => {
                  if (loan.status === "Repaid") {
                    return;
                  }
                  return (
                    <div key={loan.id}>
                      <TableRow title="Open">
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

export default Withdraw;
