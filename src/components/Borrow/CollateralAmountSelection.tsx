import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";

const CollateralPercentSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(
    borrowRequest.collateralAmount || borrowRequest.loanSize
  );

  const percents = (value / borrowRequest.loanSize) * 100;

  return (
    <SubmenuCard
      title="Collateral Percent"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="mt-4 d-flex flex-column">
        <CustomInput
          onChangeFunction={(e: any) => {
            setValue(parseInt(e.target.value) || 0);
          }}
          value={value.toString()}
          type="number"
        />
        <div className="text-lightest-gray text-lg ">{percents}%</div>
        <div
          className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
          onClick={() => {
            setBorrowRequest({
              ...borrowRequest,
              collateralAmount: value,
            });
            setSubmenu(null);
          }}
        >
          Submit
        </div>
      </div>
    </SubmenuCard>
  );
};
const CollateralAmountSelection = () => {
  const { borrowRequest, setSubmenu } = useContext(BorrowPageContext);
  const { collateralAmount, loanSize } = borrowRequest;
  console.log(collateralAmount, loanSize);
  const title = `${
    collateralAmount ? Math.ceil((collateralAmount / loanSize) * 100) : 100
  }%`;
  return (
    <CustomSubmenuLink
      title={title}
      onClickAction={() => {
        setSubmenu(<CollateralPercentSubmenu />);
      }}
    />
  );
};
export default CollateralAmountSelection;
