import React, { useState, useContext } from "react";
import { BorrowPageContext } from "../../context/borrowContext";
import CustomInput from "../UI/CustomInput";
import SubmenuCard from "../UI/SubmenuCard";
import CustomSubmenuLink from "../UI/CustomSubmenuLink";

const CollateralPercentSubmenu = () => {
  const { borrowRequest, setBorrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );
  const [value, setValue] = useState(borrowRequest.collateralPercent);

  return (
    <SubmenuCard
      title="Collateral Percent"
      onCloseAction={() => {
        setSubmenu(null);
      }}
    >
      <div className="mt-4 d-flex flex-column">
        <CustomInput
          onChangeFunction={(e: any) => {
            setValue(parseInt(e.target.value) || 0);
          }}
          value={value.toString()}
          type="number"
        />
        <div className="text-lightest-gray text-lg ">%</div>
        <div
          className="py-1 px-3 my-4 mx-auto border-thin pointer text-black"
          onClick={() => {
            setBorrowRequest({
              ...borrowRequest,
              collateralPercent: value,
            });
            setSubmenu(null);
          }}
        >
          Submit
        </div>
      </div>
    </SubmenuCard>
  );
}
const CollateralPercentSelection = () => {
  const { borrowRequest, setSubmenu } = useContext(
    BorrowPageContext
  );

  return (
    <CustomSubmenuLink
      title={`${borrowRequest.collateralPercent}%`}
      onClickAction={() => {
        setSubmenu(
         <CollateralPercentSubmenu/>
        );
      }}
    />
  );
};
export default CollateralPercentSelection;
