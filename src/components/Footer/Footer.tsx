import React from "react";
import "./footer.scss";

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
  const latestBlock = 12312345;
  const footerLinks = [
    {
      name: "Privacy",
      url:
        "https://app.termly.io/document/privacy-policy/398c0f5b-02f5-4078-8dd7-72c1cd25c56a",
    },
    {
      name: "Terms",
      url:
        "https://app.termly.io/document/terms-of-use-for-website/21b27900-06c4-4b4d-bc95-73642b34e437",
    },
    {
      name: "Disclaimer",
      url:
        "https://app.termly.io/document/disclaimer/3115ce72-c995-48f8-905c-9219d109d32b",
    },
  ];
  return (
    <div className="footer mt-4 px-4 d-flex align-items-center">
      <div className="container-wrapper text-lightest-gray text-sm d-flex justify-content-between flex-1">
        <div className="d-flex flex-row align-items-center">
          <div className="status-circle mr-2 success"></div>
          <div> Latest block: {latestBlock} </div>
        </div>
        <div className="d-flex flex-row">
          {footerLinks.map((link) => {
            return (
              <FooterLink name={link.name} url={link.url} key={link.name} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
