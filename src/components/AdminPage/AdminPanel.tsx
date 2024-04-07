import React, { useContext, useEffect } from "react";
import styles from "../../styles/adminstyle.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../ContextRelatedThings/Loading";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";
import logo from "../../assets/logo.png";
import { auth } from "../../firebase/firebaseSDK";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminPanel() {
  const navigateTo = useNavigate();
  let { setOpenDialog } = useContext(GlobalContextHolder);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //signed in
        setOpenDialog("");
        navigateTo("AddAProduct");
      } else {
        //signed out
        navigateTo("/");
      }
    });
  }, []);

  return (
    <>
      <Loading color={"orange"} />
      <div className={styles.adminContainer}>
        <img src={logo} className={styles.adminLogo}></img>
        {/* <h1>Admin Panel</h1> */}
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
              navigateTo("SeeAllProducts");
            }}
          >
            See All Products
          </button>
          <button
            className={styles.signOut}
            onClick={() => {
              signOut(auth)
                .then(() => navigateTo("/"))
                .catch((error) => alert("Sign Out Error: " + error));
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <Outlet></Outlet>
    </>
  );
}
