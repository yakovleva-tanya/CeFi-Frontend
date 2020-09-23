import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import dropdown from "../../../dist/assets/arrow-down.svg";
import CurrencyIcon from "../UI/CurrencyIcon";

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
        <CurrencyIcon className="mr-3" currency={selected} />
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
                <CurrencyIcon className="mr-3" currency={option} />
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
