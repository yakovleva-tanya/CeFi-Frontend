import React, { useContext, useEffect, useState } from "react";
import {
  DashboardContext,
  UseCompoundContext,
  UseCompoundContextProvider,
} from "../../../context/dashboardContext";
import {
  compoundWithdraw,
  compoundSupply,
} from "../../../actions/DashboardUseActions";

import CustomSubmenuLink from "../../UI/CustomSubmenuLink";
import BR from "../../UI/BR";
import TableRow from "../../UI/TableRow";
import PrimaryButton from "../../UI/PrimaryButton";
import SubmenuCard from "../../UI/SubmenuCard";
import CustomInput from "../../UI/CustomInput";
import { LoanInterface } from "../../../context/types";
import ViewContractLink from "../ViewContractLink";
import { AppContext, AppContextState } from "../../../context/app";
import FormValidationWarning from "../../UI/FormValidationWarning";
import copy from "../../../copy.json";

const UseCompoundMainSection = () => {
  const { state, updateAppState } = useContext(AppContext);
  const { loans } = useContext(DashboardContext);
  const [maxDepositWarning, setMaxDepositWarning] = useState("");
  const [maxWithdrawWarning, setMaxWithdrawWarning] = useState("");

  const {
    setSuccess,
    setWithdrawing,
    setSupplying,
    selectedLoan,
    setSelectedLoan,
    amountSubmenu,
    setAmountSubmenu,
    amount,
    setAmount,
    setSuccessMessage,
  } = useContext(UseCompoundContext);

  const withdraw = async () => {
    setWithdrawing(true);
    const res = await compoundWithdraw(amount);
    setSuccessMessage("Withdraw accepted");
    setAmount(0);
    setWithdrawing(false);
    setSuccess(res);
  };

  const supply = async () => {
    setSupplying(true);
    const res = await compoundSupply(amount);
    setSuccessMessage("Deposit accepted");
    setSupplying(false);
    setSuccess(res);
  };
  const activeLoans = loans
    ? loans.filter((loan: LoanInterface) => {
        return loan.status !== "Closed";
      })
    : null;

  useEffect(() => {
    if (!selectedLoan) return;
    if (
      amount >
      selectedLoan.totalOwedAmount - selectedLoan.compound.supplied
    ) {
      setMaxDepositWarning(
        `You cannot supply more than ${
          selectedLoan.totalOwedAmount - selectedLoan.compound.supplied
        } ${selectedLoan.token}.`
      );
    } else {
      setMaxDepositWarning("");
    }
    if (amount > selectedLoan.compound.supplied) {
      setMaxWithdrawWarning(
        `You cannot withdraw more than ${selectedLoan.compound.supplied} ${selectedLoan.token}.`
      );
    } else {
      setMaxWithdrawWarning("");
    }
  }, [amount]);

  const { description } = copy.pages.dashboard["spend-compound"];

  return (
    <div className="my-4">
      {selectedLoan &&
        (amountSubmenu ? (
          <SubmenuCard
            title="Amount"
            onCloseAction={() => {
              setAmountSubmenu(false);
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
                  setAmount(value);
                }}
                value={amount.toString()}
                type="string"
                onBlur={(e: any) => {
                  let value = parseFloat(e.target.value);
                  if (isNaN(value)) {
                    value = 0;
                  }
                  setAmount(value);
                }}
              />
              <div className="text-lightest-gray text-lg ">
                {selectedLoan.token}
              </div>
              <div
                className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
                onClick={() => {
                  setAmountSubmenu(false);
                }}
              >
                Submit
              </div>
            </div>
          </SubmenuCard>
        ) : (
          <div>
            <div className="table border-thin mb-4 mt-3">
              <TableRow title="Loan amount">
                <div className="font-medium">
                  {`${selectedLoan.totalOwedAmount} ${selectedLoan.token}`}
                </div>
              </TableRow>
              <BR />
              <TableRow title={`Supplied ${selectedLoan.token}`}>
                <div className="font-medium">{`${selectedLoan.compound.supplied} ${selectedLoan.token}`}</div>
              </TableRow>
              <BR />
              <TableRow title="APY">
                <div className="font-medium">
                  {Math.round(
                    state.tokenData[selectedLoan.token].supplyAPY * 10000
                  ) / 100}
                  %
                </div>
              </TableRow>
              <BR />
              <TableRow title={`${selectedLoan.token} earned`}>
                <div className="font-medium">{`${selectedLoan.compound.earned} ${selectedLoan.token}`}</div>
              </TableRow>
              <BR />
              <TableRow title="Amount">
                <CustomSubmenuLink
                  title={`${amount} ${selectedLoan.token}`}
                  onClickAction={() => {
                    setAmountSubmenu(true);
                  }}
                />
              </TableRow>
            </div>
            <ViewContractLink link={selectedLoan.transactionHash} />
            {maxDepositWarning && (
              <FormValidationWarning message={maxDepositWarning} />
            )}
            {maxWithdrawWarning && (
              <FormValidationWarning message={maxWithdrawWarning} />
            )}
            <div className="d-flex flex-row justify-content-between">
              <div>
                <PrimaryButton
                  text="Withdraw"
                  onClick={() => {
                    if (!maxWithdrawWarning) {
                      withdraw();
                    }
                  }}
                  disabled={Boolean(maxWithdrawWarning)}
                />
              </div>
              <div
                onClick={() => {
                  if (!maxDepositWarning) {
                    supply();
                  }
                }}
                className={`font-medium text-lg mt-4 py-3 ${
                  maxDepositWarning ? "disabled" : "pointer"
                }`}
                style={{
                  backgroundColor: "#00D395",
                  borderRadius: "4px",
                  color: "white",
                  minWidth: "152px",
                }}
              >
                Deposit
              </div>
            </div>
          </div>
        ))}
      {!selectedLoan && (
        <div className="my-2">
          <div className="text-gray mb-4">{description}</div>
          <div className="table border-thin mb-4 mt-3">
            {activeLoans &&
              activeLoans.map((loan: LoanInterface, i: number) => {
                return (
                  <div key={loan.id}>
                    <TableRow title={`ID ${loan.id}`}>
                      <CustomSubmenuLink
                        title={`${loan.compound.supplied} ${loan.token}`}
                        onClickAction={() => {
                          setSelectedLoan(loan);
                        }}
                      />
                    </TableRow>
                    {activeLoans.length - 1 !== i && <BR />}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
export default UseCompoundMainSection;
