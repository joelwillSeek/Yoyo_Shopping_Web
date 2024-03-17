import React from "react";
import styles from "../styles/admin.module.css";

export default function AdminPanel() {
  return (
    <div className={styles.adminContainer}>
      <h1>Admin Panel</h1>
      <div className={styles.adminTabs}>
        <button>Add Product</button>
        <button>Products</button>
        <button>Products</button>
      </div>
    </div>
  );
}
