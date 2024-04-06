import React, { createContext, useState } from "react";

const GlobalContextHolder = createContext({
  openDialog: "",
  setOpenDialog(openDialog: string) {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  let [openDialog, setOpenDialog] = useState("");

  return (
    <GlobalContextHolder.Provider value={{ openDialog, setOpenDialog }}>
      {children}
    </GlobalContextHolder.Provider>
  );
};

export default GlobalContextHolder;
