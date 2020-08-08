import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

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
        variant="link"
        id="toggle"
        className="dropdown font-medium p-1 text-gray"
      >
        {`${selected}   `}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option: string) => {
          return (
            <Dropdown.Item
              key={option}
              eventKey={option}
              onSelect={(e) => {
                handleSelect(e);
              }}
            >
              {option}
            </Dropdown.Item>
          );
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
