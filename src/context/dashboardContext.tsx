import React, { createContext, useState } from "react";

export interface DashboardContextInterface {
  onPage: string;
  setOnPage: Function;
}

export const DashboardContext = createContext<DashboardContextInterface>({
  onPage: "",
  setOnPage: () => {},
});

type DashboardContextProps = {
  children: React.ReactNode;
};

const DashboardContextProvider = ({ children }: DashboardContextProps) => {
  const [onPage, setOnPage] = useState("Lend-Claim");
  return (
    <DashboardContext.Provider
      value={{
        onPage,
        setOnPage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContextProvider;
