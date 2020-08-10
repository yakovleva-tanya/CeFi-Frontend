import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import dai from "../../../dist/assets/dai-logo.png";
import usdc from "../../../dist/assets/usdc-logo.png";
import usdt from "../../../dist/assets/usdt-logo.png";
import "./custom-dropdown.scss";
import dropdown from "../../../dist/assets/arrow-down.png";

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
        className="dropdown font-medium p-1 text-gray dropdown-title dropdown-title d-flex flex-row align-items-center"
      >
        <div className="mr-2">{`${selected}   `}</div>
        {selected === "DAI" && <img src={dai} height="20" />}
        {selected === "USDT" && <img src={usdt} height="20" />}
        {selected === "USDC" && <img src={usdc} height="20" />}
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

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="dropdown font-medium p-1 text-gray dropdown-title dropdown-title d-flex flex-row align-items-center"
  >
    {children}
    <img height={8} src={dropdown} className="ml-3" />
  </a>
));
