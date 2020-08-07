import React, { createContext, useState } from "react";

const defaultState = {

};

interface BorrowPageContextInterface {

}

export const BorrowPageContext = createContext<BorrowPageContextInterface>(
  defaultState
);

type BorrowPageContextProps = {
  children: React.ReactNode;
};

const BorrowPageContextProvider = ({ children }: BorrowPageContextProps) => {
  const [stage, setStage] = useState(1);
  const [subMenu, setSubmenu] = useState(null);

  return (
    <BorrowPageContext.Provider
      value={{

      }}
    >
      {children}
    </BorrowPageContext.Provider>
  );
};
export default BorrowPageContextProvider;
