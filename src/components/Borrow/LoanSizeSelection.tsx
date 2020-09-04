import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";

const LoanSizeSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(borrowRequest.loanSize.toFixed(2));

  return (
    <SubmenuCard
      title="Loan size"
      onCloseAction={() => {
        setSubmenu(null);
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
          Enter
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
        setSubmenu(<LoanSizeSubmenu />);
      }}
    />
  );
};

export default LoanSizeSelection;
