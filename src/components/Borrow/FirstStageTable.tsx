import React, { useState, useContext } from "react";
import TableRow from "../UI/TableRow";
import BR from "../UI/BR";
import { MockDropdown } from "../UI/CustomDropdown";
import ConnectPlaid from './../../actions/ConnectPlaid';
import { AppContext } from "./../../context/app";
import { CustomSubmitButton } from "../UI/CustomSubmitButton";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";

const FirstStageTable = () => {
  const { state, updateAppState } = useContext(AppContext);
  const plaidConnected = state?.plaid?.loggedIn;
  const bankInfo = state?.dataProviderResponse?.bankInfo;
  const address = state?.web3State?.address;
  const [submenu, setSubmenu] = useState("");
  return (
    <div>
      {!submenu ? (
        <div className="table border-thin my-5">
          <TableRow title="Lend With">
            <MockDropdown options={["DAI", "USDC", "USDT"]} />
          </TableRow>
          <BR />
          <TableRow title="Loan Size">
            <CustomSubmenuLink
              title="0 DAI"
              onClickAction={() => {
                setSubmenu("Loan Size");
              }}
            />
          </TableRow>
          <BR />
          <TableRow title="Loan Term">
            <CustomSubmenuLink
              title="1 day"
              onClickAction={() => {
                setSubmenu("Loan Term");
              }}
            />
          </TableRow>
          <BR />
          <TableRow title="Collateral With">
            <MockDropdown options={["ETH", "BTC", "USDC", "DAI"]} />
          </TableRow>
          <BR />
          <TableRow title="Collateral Percent">
            <CustomSubmenuLink
              title="50%"
              onClickAction={() => {
                setSubmenu("Collateral Percent");
              }}
            />
          </TableRow>
          <BR />
          <TableRow title="Loan Type">
            <MockDropdown options={["Fixed", "Variable"]} />
          </TableRow>
          <BR />
          <TableRow title="Bank (optional)">
            <CustomSubmitButton
              onClickAction={ConnectPlaid(updateAppState, address)}
              approved={!!plaidConnected}
              text="Connect"
            />
          </TableRow>
        </div>
      ) : (
        <SubmenuCard
          title={submenu}
          onClickAction={() => {
            setSubmenu("");
          }}
        >
          <div></div>
        </SubmenuCard>
      )}
    </div>
  );
};

export default FirstStageTable;
