import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Body from "./components/Body";
import TopPanel from "./components/TopPanel";
import "./styles/general.css";
import Catagories from "./components/Catagories";
import {
  getAllProductsRegardlessOfCategory,
  getCategoriesList,
} from "./firebase/firebaseBackEnd";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Loading from "./components/Loading";
import GlobalContextHolder, {
  GlobalContextProvider,
} from "./components/ContextHolder";
import AddAProduct from "./components/AdminPanel/AddAProduct";
import RemoveAProduct from "./components/AdminPanel/RemoveAProduct";
import UpdateAProduct from "./components/AdminPanel/UpdateAProduct";

const rootElement = document.getElementById("root");

let App = () => {
  // let [getApi, setApi] = useState(null);

  // useEffect(() => {
  //   setOpenDialog("Loading");
  //   getJsonFromApi(setApi);
  //   getJsonFromApiForCategories(setListOfCategories);
  // }, []);

  return (
    <>
      <Loading color={"#fc6f03"} />

      <Body></Body>
    </>
  );
};

createRoot(rootElement!).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="Admin" element={<AdminPanel />}>
            <Route path="AddAProduct" element={<AddAProduct />}></Route>
            <Route path="RemoveAProduct" element={<RemoveAProduct />}></Route>
            <Route path="UpdateAProduct" element={<UpdateAProduct />}></Route>
          </Route>
          <Route path="*" element={<h1>No Such Page</h1>} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </GlobalContextProvider>
);
