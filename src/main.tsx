import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Body from "./components/Body";
import TopPanel from "./components/TopPanel";
import "./styles/general.css";
import Catagories from "./components/Catagories";
import {
  getAllProductsRegardlessOfCategory,
  getCategoriesList,
} from "./firebase/firebaseBackEnd";
import AdminPanel from "./components/AdminPanel";

const rootElement = document.getElementById("root");

let App = () => {
  let [getApi, setApi] = useState(null);
  let [searchTerm, setSearchTerm] = useState("");
  let [listOfCategories, setListOfCategories] = useState([]);

  let getJsonFromApiForCategories = async (
    setApi: React.Dispatch<React.SetStateAction<any>>
  ) => {
    let response = await getCategoriesList();
    console.log(response!["List"]);
    setApi(response!["List"]);
  };

  let getJsonFromApi = async (
    setApi: React.Dispatch<React.SetStateAction<any>>
  ) => {
    let response = await getAllProductsRegardlessOfCategory();
    setApi(response);
  };

  useEffect(() => {
    getJsonFromApi(setApi);
    getJsonFromApiForCategories(setListOfCategories);
  }, []);

  return (
    <>
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
  <BrowserRouter>
    <React.StrictMode>
      {/* routes */}
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="Admin" element={<AdminPanel />} />
        <Route path="*" element={<h1>No Such Page</h1>} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
