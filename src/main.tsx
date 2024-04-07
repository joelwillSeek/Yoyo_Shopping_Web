import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Body from "./components/ShoppingPage/Body";
import "./styles/general.css";
import AdminPanel from "./components/AdminPage/AdminPanel";
import Loading from "./components/ContextRelatedThings/Loading";
import { GlobalContextProvider } from "./components/ContextRelatedThings/ContextHolder";
import AddAProduct from "./components/AdminPage/AddAProduct";
import RemoveAProduct from "./components/AdminPage/RemoveAProduct";
import UpdateAProduct from "./components/AdminPage/UpdateAProduct";
import SeeAllProducts from "./components/AdminPage/SeeAllProducts";

const rootElement = document.getElementById("root");

let App = () => {
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
            <Route path="SeeAllProducts" element={<SeeAllProducts />}></Route>
          </Route>
          <Route path="*" element={<h1>No Such Page</h1>} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </GlobalContextProvider>
);
