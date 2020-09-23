import React from "react";
import dai from "../../../dist/assets/dai-logo.svg";
import usdc from "../../../dist/assets/usdc-logo.svg";
import usdt from "../../../dist/assets/usdt-logo.svg";
import eth from "../../../dist/assets/eth-logo.svg";
import link from "../../../dist/assets/link-logo.png";
import btc from "../../../dist/assets/btc-logo.svg";
import lend from "../../../dist/assets/lend-logo.svg";
import mkr from "../../../dist/assets/mkr-logo.svg";
import snx from "../../../dist/assets/snx-logo.svg";
import yfi from "../../../dist/assets/yfi-logo.svg";
import comp from "../../../dist/assets/comp-logo.svg";
import teller from "../../../dist/assets/teller-small-logo.svg";

type IconProps = {
  currency: string;
  className?: string;
};
const CurrencyIcon = ({ currency, className = "" }: IconProps) => {
  return (
    <>
      {currency === "DAI" && (
        <img className={className} src={dai} height="20" />
      )}
      {currency === "USDT" && (
        <img className={className} src={usdt} height="20" />
      )}
      {currency === "USDC" && (
        <img className={className} src={usdc} height="20" />
      )}
      {currency === "ETH" && (
        <img className={className} src={eth} height="20" />
      )}
      {currency === "LINK" && (
        <img className={className} src={link} height="20" />
      )}
      {currency === "wBTC" && (
        <img className={className} src={btc} height="20" />
      )}
      {currency === "SNX" && (
        <img className={className} src={snx} height="20" />
      )}
      {currency === "MKR" && (
        <img className={className} src={mkr} height="20" />
      )}
      {currency === "YFI" && (
        <img className={className} src={yfi} height="20" />
      )}
      {currency === "LEND" && (
        <img className={className} src={lend} height="20" />
      )}
      {currency === "COMP" && (
        <img className={className} src={comp} height="20" />
      )}
      {currency === "TLR" && (
        <img className={className} src={teller} height="20" width='20' />
      )}
    </>
  );
};

export default CurrencyIcon;
