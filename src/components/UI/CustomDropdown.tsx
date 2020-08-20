import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import dai from "../../../dist/assets/dai-logo.svg";
import usdc from "../../../dist/assets/usdc-logo.svg";
import usdt from "../../../dist/assets/usdt-logo.svg";
import eth from "../../../dist/assets/eth-logo.svg";
import link from "../../../dist/assets/link-logo.png";

import "./custom-dropdown.scss";
import dropdown from "../../../dist/assets/arrow-down.svg";

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
        <div className="mr-2">{`${selected}   `}</div>
        {selected === "DAI" && <img src={dai} height="20" />}
        {selected === "USDT" && <img src={usdt} height="20" />}
        {selected === "USDC" && <img src={usdc} height="20" />}
        {selected === "ETH" && <img src={eth} height="20" />}
        {selected === "LINK" && <img src={link} height="20" />}
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
                <div className="mr-2">{option}</div>
                {option === "DAI" && <img src={dai} height="20" />}
                {option === "USDT" && <img src={usdt} height="20" />}
                {option === "USDC" && <img src={usdc} height="20" />}
                {option === "ETH" && <img src={eth} height="20" />}
                {option === "LINK" && <img src={link} height="20" />}
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
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="dropdown font-medium text-gray dropdown-title dropdown-title d-flex flex-row align-items-center"
      >
        {children}
        <img height={14} src={dropdown} className="ml-3" />
      </a>
    );
  }
);
CustomToggle.displayName = "CustomToggle";
