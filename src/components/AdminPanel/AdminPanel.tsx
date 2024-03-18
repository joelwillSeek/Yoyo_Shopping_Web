import React from "react";
import styles from "../../styles/adminstyle.module.css";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigateTo = useNavigate();
  return (
    <>
      <div className={styles.adminContainer}>
        <img src="./Logo.png" className={styles.adminLogo}></img>
        <h1>Admin Panel</h1>
        <div className={styles.adminTabs}>
          <button
            onClick={() => {
              navigateTo("AddAProduct");
            }}
          >
            Add Product
          </button>
          <button>Products</button>
          <button>Products</button>
        </div>
      </div>

      <Outlet></Outlet>
    </>
  );
}
