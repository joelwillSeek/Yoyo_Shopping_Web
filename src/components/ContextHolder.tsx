import React, { createContext, useState } from "react";

const GlobalContextHolder = createContext({
  openDialog: true,
  setOpenDialog(openDialog: boolean) {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  let [openDialog, setOpenDialog] = useState(true);

  return (
    <GlobalContextHolder.Provider value={{ openDialog, setOpenDialog }}>
      {children}
    </GlobalContextHolder.Provider>
  );
};

export default GlobalContextHolder;
