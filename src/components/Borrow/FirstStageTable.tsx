import React, { useContext, useState } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { CustomDropdown } from "../UI/CustomDropdown";
import ConnectPlaid from "./../../actions/ConnectPlaid";
import { AppContext } from "./../../context/app";
import { CustomSubmitButton } from "../UI/CustomSubmitButton";
import { BorrowPageContext } from "../../context/borrowContext";
//import { CollateralAdjustModal } from "../CollateralAdjustModal";
import LoanTermSelection from "./LoanTermSelection";
import CollateralPercentSelection from "./CollateralPercentSelection";
import LoanSizeSelection from "./LoanSizeSelection";
import WarningModal from "../UI/WarningModal";
import Coda from "../Coda/Coda";

const FirstStageTable = () => {
  const { borrowRequest, setBorrowRequest } = useContext(BorrowPageContext);
  const isSecured = Boolean(borrowRequest.loanType === "Secured");
  return (
    <div>
      <div className="table border-thin my-5">
        <TableRow title="Borrow">
          <CustomDropdown
            options={["DAI", "USDC"]}
            selected={borrowRequest.lendWith}
            handleSelect={(eventKey: any) => {
              setBorrowRequest({
                ...borrowRequest,
                lendWith: eventKey,
              });
            }}
          />
        </TableRow>
        <BR />
        <TableRow title="Loan size">
          <LoanSizeSelection />
        </TableRow>
        <BR />
        <TableRow title="Loan period">
          <LoanTermSelection />
        </TableRow>
        <BR />
        <TableRow title="Collateral asset">
          <CustomDropdown
            options={["ETH", "LINK"]}
            selected={borrowRequest.collateralWith}
            handleSelect={(eventKey: any) => {
              setBorrowRequest({
                ...borrowRequest,
                collateralWith: eventKey,
              });
            }}
          />
        </TableRow>
        <BR />
        <TableRow title={`Bank ${isSecured ? "(optional)" : ""}`}>
          <ConnectPlaidButton />
        </TableRow>
        <BR />
        <TableRow title={`Coda`}>
          <ConnectCodaButton />
        </TableRow>
        <BR />
        <TableRow title="Collateral percent">
          <CollateralPercentSelection />
        </TableRow>
      </div>
    </div>
  );
};

export default FirstStageTable;

const ConnectPlaidButton = () => {
  const { state, updateAppState } = useContext(AppContext);
  const plaidConnected = state?.plaid?.loggedIn;
  // const bankInfo = state?.dataProviderResponse?.bankInfo;
  const address = state?.web3State?.address;
  const [loading, setLoading] = useState(false);
  const onClickAction = async () => {
    setLoading(true);
    await ConnectPlaid(updateAppState, address, setLoading)();
  };

  return (
    <CustomSubmitButton
      disabled={!address}
      loading={loading}
      onClickAction={onClickAction}
      approved={!!plaidConnected}
      text="Connect"
    />
  );
};

const ConnectCodaButton = () => {
  const { state } = useContext(AppContext);
  const [codaConnected, setCodaConnected] = useState(false);
  const [codaModal, setCodaModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const address = state?.web3State?.address;
  const onClickAction = async () => {
    setLoading(true);
    setCodaModal(true);
    setLoading(false);
  };

  return (
    <>
      {codaModal && (
        <WarningModal
          show={codaModal}
          proceed={() => {}}
          cancel={() => {
            setCodaModal(false);
          }}
          text="Upload your credit score + signature json file provided from the Coda app to get your interest rate reduced."
          header="Upload Coda file"
          content={<CodaForm />}
        />
      )}
      <CustomSubmitButton
        disabled={!address}
        loading={loading}
        onClickAction={onClickAction}
        approved={!!codaConnected}
        text="Connect"
      />
    </>
  );
};

const CodaForm = () => {
  return (
    <div className="m-4">
      <div className="px-2 py-2 font-medium border-thin">Upload Coda JSON</div>
      <div>
        Don’t have the Coda json file?{" "}
        <span className="underlined pointer">Download the Coda app.</span>
      </div>
    </div>
  );
};
