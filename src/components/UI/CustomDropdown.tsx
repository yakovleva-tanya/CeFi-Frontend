import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
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
import dropdown from "../../../dist/assets/arrow-down.svg";

import "./custom-dropdown.scss";

type dropdownProps = {
  selected: string;
  handleSelect: Function;
  options: Array<string>;
};

export const CustomDropdown = ({
  selected,
  handleSelect,
  options,
}: dropdownProps) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        variant="link"
        id="toggle"
        className="dropdown font-medium text-gray dropdown-title dropdown-title d-flex flex-row align-items-center"
      >
        <div className="mr-3 text-black">{`${selected}   `}</div>
        {selected === "DAI" && <img className="mr-3" src={dai} height="20" />}
        {selected === "USDT" && <img className="mr-3" src={usdt} height="20" />}
        {selected === "USDC" && <img className="mr-3" src={usdc} height="20" />}
        {selected === "ETH" && <img className="mr-3" src={eth} height="20" />}
        {selected === "LINK" && <img className="mr-3" src={link} height="20" />}
        {selected === "wBTC" && <img className="mr-3" src={btc} height="20" />}
        {selected === "SNX" && <img className="mr-3" src={snx} height="20" />}
        {selected === "MKR" && <img className="mr-3" src={mkr} height="20" />}
        {selected === "YFI" && <img className="mr-3" src={yfi} height="20" />}
        {selected === "LEND" && <img className="mr-3" src={lend} height="20" />}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        {options.map((option: string) => {
          if (option === selected) {
            return;
          } else {
            return (
              <Dropdown.Item
                key={option}
                eventKey={option}
                onSelect={(e) => {
                  handleSelect(e);
                }}
                className="dropdown-title d-flex flex-row align-items-center"
              >
                <div className="text-black mr-3 font-medium">{option}</div>
                {option === "DAI" && (
                  <img className="mr-3" src={dai} height="20" />
                )}
                {option === "USDT" && (
                  <img className="mr-3" src={usdt} height="20" />
                )}
                {option === "USDC" && (
                  <img className="mr-3" src={usdc} height="20" />
                )}
                {option === "ETH" && (
                  <img className="mr-3" src={eth} height="20" />
                )}
                {option === "LINK" && (
                  <img className="mr-3" src={link} height="20" />
                )}
                {option === "wBTC" && (
                  <img className="mr-3" src={btc} height="20" />
                )}
                {option === "SNX" && (
                  <img className="mr-3" src={snx} height="20" />
                )}
                {option === "MKR" && (
                  <img className="mr-3" src={mkr} height="20" />
                )}
                {option === "YFI" && (
                  <img className="mr-3" src={yfi} height="20" />
                )}
                {option === "LEND" && (
                  <img className="mr-3" src={lend} height="20" />
                )}
              </Dropdown.Item>
            );
          }
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

type customDropdownProps = {
  options: Array<string>;
};
export const MockDropdown = ({ options }: customDropdownProps) => {
  const [selected, setSelected] = useState(options[0]);
  const handleSelect = (eventKey: any, e?: React.SyntheticEvent<{}>) => {
    setSelected(eventKey);
  };
  return (
    <CustomDropdown
      selected={selected}
      handleSelect={handleSelect}
      options={options}
    />
  );
};

type toggleProps = {
  children: React.ReactNode;
  onClick: Function;
};
const CustomToggle = React.forwardRef<HTMLAnchorElement, toggleProps>(
  ({ children, onClick }, ref) => {
    return (
      <a
        href="https://etherscan.io/tx/"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="dropdown font-medium text-gray dropdown-title dropdown-title d-flex flex-row align-items-center"
      >
        {children}
        <img height={14} src={dropdown} />
      </a>
    );
  }
);
CustomToggle.displayName = "CustomToggle";
