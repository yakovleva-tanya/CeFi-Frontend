import React from "react";
import { LoanTermSubmenu } from "./LoanTermSelection";
import { LoanSizeSubmenu } from "./LoanSizeSelection";
import { CollateralPercentSubmenu } from "./CollateralPercentSelection";
import { CollateralAmountSubmenu } from "./CollateralAmountSelection";

type submenuTypes = {
  variant: string;
};

const Submenu = ({ variant }: submenuTypes) => {
  return (
    <div>
      {variant === "LoanTerm" && <LoanTermSubmenu />}
      {variant === "LoanSize" && <LoanSizeSubmenu />}
      {variant === "CollateralPercent" && <CollateralPercentSubmenu />}
      {variant === "CollateralAmount" && <CollateralAmountSubmenu />}
    </div>
  );
};

export default Submenu;
