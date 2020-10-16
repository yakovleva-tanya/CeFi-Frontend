import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import copy from "../../copy.json";

export const LoanSizeSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(borrowRequest.loanSize.toFixed(2));
  const pageCopy = copy.pages.borrow.main.form.step2.loanSize.submenu;

  return (
    <SubmenuCard
      title={pageCopy.title}
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="d-flex flex-column">
        <div className="mb-4">{pageCopy.description} </div>
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
            setValue(value);
          }}
          value={value.toString()}
          type="string"
          onBlur={(e: any) => {
            let value = parseFloat(e.target.value);
            if (isNaN(value)) {
              value = 0;
            }
            setValue(value.toFixed(2));
          }}
        />
        <div className="text-lightest-gray text-lg ">
          {borrowRequest.lendWith}
        </div>
        <div
          className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
          onClick={() => {
            setBorrowRequest({
              ...borrowRequest,
              loanSize: parseFloat(value),
            });
            setSubmenu(null);
          }}
        >
          {pageCopy.CTA}
        </div>
      </div>
    </SubmenuCard>
  );
};

const LoanSizeSelection = () => {
  const { borrowRequest, setSubmenu } = useContext(BorrowPageContext);

  return (
    <CustomSubmenuLink
      title={`${borrowRequest.loanSize} ${borrowRequest.lendWith}`}
      onClickAction={() => {
        setSubmenu("LoanSize");
      }}
    />
  );
};

export default LoanSizeSelection;
