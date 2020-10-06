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
        <TableRow title={`Bloom`}>
          <ConnectBloomButton />
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

const ConnectBloomButton = () => {
  const { state } = useContext(AppContext);
  const [bloomConnected, setBloomConnected] = useState(false);
  const [bloomModal, setBloomModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const address = state?.web3State?.address;
  const onClickAction = async () => {
    setLoading(true);
    setBloomModal(true);
    setLoading(false);
  };

  return (
    <>
      {bloomModal && (
        <WarningModal
          show={bloomModal}
          proceed={null as null}
          cancel={() => {
            setBloomModal(false);
          }}
          text="Scan the QR code below with the Bloom app to get 10% off your interest rate. By connecting, you are submitting your email and ID document to Teller."
          header="Connect your BloomID"
          content={<BloomQR />}
        />
      )}
      <CustomSubmitButton
        disabled={!address}
        loading={loading}
        onClickAction={onClickAction}
        approved={!!bloomConnected}
        text="Connect"
      />
    </>
  );
};

const BloomQR = () => {
  return <div className="p-4 border-thin m-4">BloomQR</div>;
};
