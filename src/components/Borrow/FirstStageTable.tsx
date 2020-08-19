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

const FirstStageTable = () => {
  const { borrowRequest, setBorrowRequest } = useContext(BorrowPageContext);

  return (
    <div>
      <div className="table border-thin my-5">
        <TableRow title="Lend With">
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
        <TableRow title="Loan Size">
          <LoanSizeSelection />
        </TableRow>
        <BR />
        <TableRow title="Loan Term">
          <LoanTermSelection />
        </TableRow>
        <BR />
        <TableRow title="Collateral With">
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
        <TableRow title="Bank (optional)">
          <ConnectPlaidButton />
        </TableRow>
        <BR />
        <TableRow title="Collateral Percent">
          <CollateralPercentSelection />
        </TableRow>
        <BR />
        <TableRow title="Loan Type">
          <CustomDropdown
            options={["Fixed", "Variable"]}
            selected={borrowRequest.loanType}
            handleSelect={(eventKey: any) => {
              setBorrowRequest({ ...borrowRequest, loanType: eventKey });
            }}
          />
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
    await ConnectPlaid(updateAppState, address)();
    setLoading(false);
  };

  return (
    <CustomSubmitButton
      loading={loading}
      onClickAction={onClickAction}
      approved={!!plaidConnected}
      text="Connect"
    />
  );
};
