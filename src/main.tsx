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

const rootElement = document.getElementById("root");

let App = () => {
  let [getApi, setApi] = useState(null);
  let [searchTerm, setSearchTerm] = useState("");
  let [listOfCategories, setListOfCategories] = useState([]);
  let { setOpenDialog } = useContext(GlobalContextHolder);

  let getJsonFromApiForCategories = async (
    setApi: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      let response = await getCategoriesList();
      console.log(response ? ["List"] : null);
      setApi(response ? ["List"] : null);
    } catch (e) {
      console.log(e);
    }
  };

  let getJsonFromApi = async (
    setApi: React.Dispatch<React.SetStateAction<any>>
  ) => {
    let response = await getAllProductsRegardlessOfCategory();
    setOpenDialog("");
    setApi(response);
  };

  useEffect(() => {
    setOpenDialog("Loading");
    getJsonFromApi(setApi);
    getJsonFromApiForCategories(setListOfCategories);
  }, []);

  return (
    <>
      <Loading color={"#fc6f03"} />
      <TopPanel setSearch={setSearchTerm}></TopPanel>
      <div className="catagoriesContainer">
        {listOfCategories.map((category, index) => (
          <Catagories key={index} name={category} color={"#aaa"}></Catagories>
        ))}
      </div>
      <Body getApi={getApi} getSearch={searchTerm}></Body>
    </>
  );
};

createRoot(rootElement!).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        {/* routes */}
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="Admin" element={<AdminPanel />}>
            <Route path="AddAProduct" element={<AddAProduct />}></Route>
            <Route
              path="RemoveAProduct"
              element={<h1>Remove A Product</h1>}
            ></Route>
            <Route
              path="UpdateAProduct"
              element={<h1>Update A Product</h1>}
            ></Route>
          </Route>
          <Route path="*" element={<h1>No Such Page</h1>} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </GlobalContextProvider>
);
