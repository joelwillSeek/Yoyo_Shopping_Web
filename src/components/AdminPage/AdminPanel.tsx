import React, { useContext, useEffect } from "react";
import styles from "../../styles/adminstyle.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../ContextRelatedThings/Loading";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";
import logo from "../../assets/logo.png";

export default function AdminPanel() {
  const navigateTo = useNavigate();

  let { setOpenDialog } = useContext(GlobalContextHolder);

  useEffect(() => {
    setOpenDialog("");
    navigateTo("AddAProduct");
  }, []);

  return (
    <>
      <Loading color={"orange"} />
      <div className={styles.adminContainer}>
        <img src={logo} className={styles.adminLogo}></img>
        <h1>Admin Panel</h1>
        <div className={styles.adminTabs}>
          <button
            onClick={() => {
              navigateTo("AddAProduct");
            }}
          >
            Add Product
          </button>
          <button
            onClick={() => {
              navigateTo("RemoveAProduct");
            }}
          >
            Remove Product
          </button>
          <button
            onClick={() => {
              navigateTo("UpdateAProduct");
            }}
          >
            Update Product
          </button>
          <button
            onClick={() => {
              navigateTo("/");
            }}
          >
            Go To Customer View
          </button>
        </div>
      </div>

      <Outlet></Outlet>
    </>
  );
}
