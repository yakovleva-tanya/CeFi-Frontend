import React, { useContext } from "react";
import { AppContext } from "../../context/app";
import { getEtherscanLink } from "../Lend/Lend";

type ContractLinkProps = {
  link: string;
};

const ViewContractLink = ({ link }: ContractLinkProps) => {
  const { state } = useContext(AppContext);
  const network = state.web3State.network;
  const url = getEtherscanLink(link, network);
  return (
    <div className="text-right mb-5">
      <a
        className="link text-lightest-gray pl-4"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View contract
      </a>
    </div>
  );
};

export default ViewContractLink;
