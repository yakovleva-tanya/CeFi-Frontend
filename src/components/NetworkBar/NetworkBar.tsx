import React, { useContext } from "react";
import { AppContext } from "../../context/app";
import TopWarning from "../UI/TopWarning";

const NetworkBar = () => {
  const { state } = useContext(AppContext);
  const network = state.web3State.network;
  interface networkNamesType {
    [key: string]: string;
  }
  const network_names: networkNamesType = {
    42: "Note: Kovan Testnet is not supported",
    3: "Note: You are currently connected to Ropsten Testnet",
    4: "Note: You are currently connected to Rinkeby Testnet",
    5: "Note: Goerli Testnet is not supported",
    unknown: "Note: You are currently on an unsupported network",
  };
  return (
    <div>
      {network && network.toString() !== "1" && (
        <TopWarning
          text={
            network_names[network]
          }
        />
      )}
    </div>
  );
};
export default NetworkBar
