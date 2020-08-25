import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import FormValidationWarning from "../UI/FormValidationWarning";

const CollateralPercentSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu , loanTerms} = useContext(
    BorrowPageContext
  );
  const {
    loanSize,
    collateralAmount,
    collateralWith,
  } = borrowRequest;
  const minCollateralAmount = (loanSize * loanTerms.minCollateralNeeded) / 100;
  const [value, setValue] = useState(collateralAmount || minCollateralAmount);
  const [warning, setWarning] = useState('');
  const percents = Math.round((value / loanSize))*100;

  return (
    <SubmenuCard
      title="Collateral Amount"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="mt-4 d-flex flex-column">
        <FormValidationWarning message={warning} />

        <CustomInput
          onChangeFunction={(e: any) => {
            if (e.target.value < minCollateralAmount) {
              setWarning(
                `Please input a collateral amount greater than ${minCollateralAmount}`
              );
            }
            else setWarning('');
            setValue(parseInt(e.target.value) || 0);
          }}
          value={value.toString()}
          type="number"
        />
        <div className="mb-3">{collateralWith}</div>
        <div className="text-lightest-gray text-lg ">{percents}%</div>
        <div
          className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
          onClick={() => {
            if (value < minCollateralAmount) {
              setValue(minCollateralAmount)
            }
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
  const { borrowRequest, setSubmenu, loanTerms } = useContext(BorrowPageContext);
  const { collateralAmount, loanSize, collateralWith } = borrowRequest;
  const minCollateralAmount =
    (loanSize * loanTerms.minCollateralNeeded) / 100;

  const title = `${collateralAmount | minCollateralAmount} ${collateralWith}`;
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
