import React, { useState, useContext, useEffect } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import FormValidationWarning from "../UI/FormValidationWarning";
import WarningModal from "../UI/WarningModal";
import eth from "../../../dist/assets/eth-logo.svg";
import link from "../../../dist/assets/link-logo.png";
import { AppContext } from "../../context/app";
import { getCollateralAmount } from "../../models/FetchTokenData";

export const CollateralAmountSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu, loanTerms } = useContext(
    BorrowPageContext
  );
  const { state } = useContext(AppContext);
  const { tokenData } = state;
  const { collateralAmount, collateralWith, lendWith } = borrowRequest;
  const loanSize = loanTerms[0].maxLoanAmount;

  const minCollateralAmount = tokenData
    ? Math.round(
        (Number(loanSize) * Number(loanTerms[0].collateralRatio) * tokenData[lendWith].price) /
          tokenData[collateralWith].price
      ) / 100
    : 0;

  const [value, setValue] = useState(collateralAmount || minCollateralAmount);
  const [warning, setWarning] = useState("");
  const [showModal, setShowModal] = useState(false);

  const percents = tokenData
    ? Math.round(
        (value * 10000 * tokenData[collateralWith].price) /
          (Number(loanSize) * tokenData[lendWith].price)
      ) / 100
    : 0;

  const ModalText =
    "Changes to terms will require an approval transaction and accrue additional gas fees. Would you like to proceed?";

  const submitNewValue = () => {
    let newValue = value;
    if (value < minCollateralAmount) {
      newValue = minCollateralAmount;
    }
    setBorrowRequest({
      ...borrowRequest,
      collateralAmount: newValue,
      approved: false,
      transferred: false,
    });
    setSubmenu(null);
  };

  return (
    <SubmenuCard
      title="Collateral amount"
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
        <div className="mb-4">Input the collateral for your loan </div>
        {collateralWith === "ETH" && <img src={eth} height="20" />}
        {collateralWith === "LINK" && <img src={link} height="20" />}
        <CustomInput
          onChangeFunction={(e: any) => {
            if (e.target.value < minCollateralAmount) {
              setWarning(
                `Please input a collateral amount greater than ${minCollateralAmount} ${collateralWith}`
              );
            } else setWarning("");
            setValue(parseFloat(e.target.value) || 0);
          }}
          value={value.toString()}
          type="number"
        />
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
          Enter
        </div>
        <FormValidationWarning message={warning} />
      </div>
    </SubmenuCard>
  );
};

export function CollateralAmountSelection(): JSX.Element {
  const { borrowRequest, setSubmenu, loanTerms, setBorrowRequest } = useContext(
    BorrowPageContext
  );
  const {
    collateralAmount,
    collateralWith,
  } = borrowRequest;
  const loanSize = loanTerms[0].maxLoanAmount;

  useEffect(() => {
    getCollateralAmount(loanSize, loanTerms[0].collateralRatio, collateralWith).then(response => {
      setBorrowRequest({...borrowRequest, collateralAmount:(response/1e18).toFixed(2)});
    })
  }, []);
  const title = `${
    Number(collateralAmount) != 0 ? collateralAmount : borrowRequest.collateralAmount
  } ${collateralWith}`;

  return (
    <CustomSubmenuLink
      title={title}
      onClickAction={() => {
        setSubmenu("CollateralAmount");
      }}
    />
  );
};
export default CollateralAmountSelection;
