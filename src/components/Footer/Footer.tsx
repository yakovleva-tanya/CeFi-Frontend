import React, { useContext } from "react";
import { AppContext } from "./../../context/app";
import "./footer.scss";
import copy from "../../copy.json";

type linkProps = {
  name: string;
  url: string;
};
const FooterLink = ({ name, url }: linkProps) => {
  return (
    <a
      className="link text-lightest-gray pl-4"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  );
};

const Footer = () => {
  const { state } = useContext(AppContext);
  const latestBlock = state.web3State.blockNumber;
  const footerLinks = copy.footer.urls;

  return (
    <div className="footer mt-4 px-4 d-flex align-items-center">
      <div className="container-wrapper text-lightest-gray text-sm d-flex justify-content-between flex-1">
        {latestBlock ? (
          <div className="d-flex flex-row align-items-center">
            <div className="status-circle mr-2 success"></div>
            <div> Latest block: {latestBlock} </div>
          </div>
        ) : (
          <div>{``}</div>
        )}
        <div className="d-flex flex-row">
          {footerLinks.map((link) => {
            return (
              <FooterLink name={link.title} url={link.url} key={link.title} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
