import React, { useState, useContext, useEffect } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";
import FormValidationWarning from "../UI/FormValidationWarning";
import WarningModal from "../UI/WarningModal";
import eth from "../../../dist/assets/eth-logo.svg";
import link from "../../../dist/assets/link-logo.png";
import copy from "../../copy.json";
import { AppContext, BaseTokens, TellerTokens } from "../../context/app";
import { getCollateralAmount } from "../../models/FetchTokenData";
import { getCollateralInfo } from "../../models/LoansInterfaceContract";

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
        (Number(loanSize) *
          Number(loanTerms[0].collateralRatio) *
          tokenData[lendWith].price) /
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
  const collateralSelectionScreen =
    copy.pages.borrow.main.form.step4.collateralSelectionScreen;

  return (
    <SubmenuCard
      title={collateralSelectionScreen.title}
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
          text={collateralSelectionScreen.collateralChangeWarningMessage}
        />
        <div className="mb-4">{collateralSelectionScreen.description}</div>
        {collateralWith === "ETH" && <img src={eth} height="20" />}
        {collateralWith === "LINK" && <img src={link} height="20" />}
        <CustomInput
          onChangeFunction={(e: any) => {
            if (e.target.value < collateralAmount) {
              setWarning(
                `${collateralSelectionScreen.minimumAmountWarning} ${collateralAmount} ${collateralWith}`
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
  const { state } = useContext(AppContext);
  const { loansInstance } = state.teller
      ? state.teller.contracts[BaseTokens.ETH][TellerTokens.tDAI]
      : null;
  const {
    collateralAmount,
    collateralWith,
  } = borrowRequest;
  const loanSize = loanTerms[0].maxLoanAmount;
  console.log({state, loansInstance});

  useEffect(() => async() => {
    if (!state.web3State || !state.web3State.address || !loansInstance) return;
    const borrower = state.web3State.address;
    const borrowerLoans = await loansInstance.methods
      .getBorrowerLoans(borrower)
      .call();
    console.log({borrower, borrowerLoans});
    const loanId = borrowerLoans[borrowerLoans.length -1];
    loansInstance.methods
      .getCollateralInfo(loanId)
      .call()
      .then((response: { neededInCollateralTokens: any }) => {
        setBorrowRequest({
          ...borrowRequest,
          collateralAmount: (response.neededInCollateralTokens / 1e18).toFixed(2),
        });
      });
  }, [state.web3State.address, loansInstance]);

  const title = `${
    Number(collateralAmount) != 0
      ? collateralAmount
      : borrowRequest.collateralAmount
  } ${collateralWith}`;

  return (
    <CustomSubmenuLink
      title={title}
      onClickAction={() => {
        setSubmenu("CollateralAmount");
      }}
    />
  );
}
export default CollateralAmountSelection;
