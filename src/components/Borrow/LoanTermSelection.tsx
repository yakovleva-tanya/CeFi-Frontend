import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";

const LoanTermSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(borrowRequest.loanTerm);

  return (
    <SubmenuCard
      title="Loan Term"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="mt-4 d-flex flex-column">
        <CustomInput
          onChangeFunction={(e: any) => {
            setValue(parseInt(e.target.value) || 1);
          }}
          value={value.toString()}
          type="number"
        />
        <div className="text-lightest-gray text-lg ">DAYS</div>
        <div
          className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
          onClick={() => {
            setBorrowRequest({ ...borrowRequest, loanTerm: value });
            setSubmenu(null);
          }}
        >
          Submit
        </div>
      </div>
    </SubmenuCard>
  );
}
const LoanTermSelection = () => {
  const { borrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );

  return (
    <CustomSubmenuLink
      title={`${borrowRequest.loanTerm} DAYS`}
      onClickAction={() => {
        setSubmenu(
         <LoanTermSubmenu/>
        );
      }}
    />
  );
};

export default LoanTermSelection;
