import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";

const LoanSizeSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(borrowRequest.loanTerm);

  return (
    <SubmenuCard
      title="Loan Size"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="mt-4 d-flex flex-column">
        <CustomInput
          onChangeFunction={(e: any) => {
            setValue(parseFloat(e.target.value) || 0);
          }}
          value={value.toString()}
          type="number"
        />
        <div className="text-lightest-gray text-lg ">
          {borrowRequest.lendWith}
        </div>
        <div
          className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
          onClick={() => {
            setBorrowRequest({ ...borrowRequest, loanSize: value });
            setSubmenu(null);
          }}
        >
          Submit
        </div>
      </div>
    </SubmenuCard>
  );
};

const LoanSizeSelection = () => {
  const { borrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );

  return (
    <CustomSubmenuLink
      title={`${borrowRequest.loanSize} ${borrowRequest.lendWith}`}
      onClickAction={() => {
        setSubmenu(
          <LoanSizeSubmenu/>
        );
      }}
    />
  );
};

export default LoanSizeSelection;
