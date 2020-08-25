import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import FormValidationWarning from "../UI/FormValidationWarning";
import WarningModal from "../UI/WarningModal";

const CollateralPercentSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu, loanTerms } = useContext(
    BorrowPageContext
  );
  const { loanSize, collateralAmount, collateralWith } = borrowRequest;
  const minCollateralAmount = (loanSize * loanTerms.minCollateralNeeded) / 100;
  const [value, setValue] = useState(collateralAmount || minCollateralAmount);
  const [warning, setWarning] = useState("");
  const [showModal, setShowModal] = useState(false);

  const percents = Math.round(value / loanSize) * 100;
  const ModalText = borrowRequest.transferred
    ? "Changing your collateral amount will result in having to resubmit your collateral approval and transfer collateral, costing additional gas fees. Are you sure you want to proceed? "
    : "Changing your collateral amount will result in having to resubmit your collateral approval and cost additional gas fees. Are you sure you want to proceed?";

  const submitNewValue = () => {
    if (value < minCollateralAmount) {
      setValue(minCollateralAmount);
    }
    setBorrowRequest({
      ...borrowRequest,
      collateralAmount: value,
      approved: false,
      transferred: false,
    });
    setSubmenu(null);
  };

  return (
    <SubmenuCard
      title="Collateral Amount"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="mt-4 d-flex flex-column">
        <WarningModal
          show={showModal}
          proceed={submitNewValue}
          cancel={() => {
            setSubmenu(null);
          }}
          text={ModalText}
        />
        <FormValidationWarning message={warning} />
        <CustomInput
          onChangeFunction={(e: any) => {
            if (e.target.value < minCollateralAmount) {
              setWarning(
                `Please input a collateral amount greater than ${minCollateralAmount}`
              );
            } else setWarning("");
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
            if (borrowRequest.approved) {
              setShowModal(true);
            } else {
              submitNewValue();
            }
          }}
        >
          Submit
        </div>
      </div>
    </SubmenuCard>
  );
};
const CollateralAmountSelection = () => {
  const { borrowRequest, setSubmenu, loanTerms } = useContext(
    BorrowPageContext
  );
  const { collateralAmount, loanSize, collateralWith } = borrowRequest;
  const minCollateralAmount = (loanSize * loanTerms.minCollateralNeeded) / 100;
  const title = `${collateralAmount || minCollateralAmount} ${collateralWith}`;
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
