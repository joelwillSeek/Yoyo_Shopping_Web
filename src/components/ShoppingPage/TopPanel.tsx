import React, { useState } from "react";
import styles from "../../styles/toppanel.module.css";
import "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param {{setFilter:Array,getFilter:Array}}
 * @returns
 */
export default function TopPanel({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const goToAdmin = useNavigate();

  const adminButtonClicked = () => {
    goToAdmin("/Admin");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.adminAndSearchDiv}>
        <img src={"./logo.png"} alt="Logo" className={styles.logo} />
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          placeholder="Search"
        />
      </div>

      <button className={styles.adminButton} onClick={adminButtonClicked}>
        Admin
      </button>
    </nav>
  );
}
