import React, { useContext } from "react";
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

const UseCompoundMainSection = () => {
  const { loans } = useContext(DashboardContext);
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
  return (
    <div>
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
                  {`${selectedLoan.amountBorrowed} ${selectedLoan.token}`}
                </div>
              </TableRow>
              <BR />
              <TableRow title={`Supplied ${selectedLoan.token}`}>
                <div className="font-medium">{`0 ${selectedLoan.token}`}</div>
              </TableRow>
              <BR />
              <TableRow title="APY">
                <div className="font-medium">0.26%</div>
              </TableRow>
              <BR />
              <TableRow title={`${selectedLoan.token} earned`}>
                <div className="font-medium">{`0 ${selectedLoan.token}`}</div>
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
            <div className="d-flex flex-row justify-content-between">
              <div>
                <PrimaryButton text="Withdraw" onClick={() => withdraw()} />
              </div>
              <div
                onClick={() => supply()}
                className="font-medium text-lg mt-4 py-3 pointer"
                style={{
                  backgroundColor: "#5DEDCA",
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
        <div>
          <div className="text-gray">
            Select the loan you want to withdraw into
          </div>
          <div className="table border-thin mb-4 mt-3">
            {loans.map((loan: LoanInterface) => {
              return (
                <div key={loan.id}>
                  <TableRow title={`ID ${loan.id}`}>
                    <CustomSubmenuLink
                      title={`${loan.amountBorrowed} ${loan.token}`}
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
export default UseCompoundMainSection;
