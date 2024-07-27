import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/toppanel.module.css";
import Logo from "../../assets/logo.png";
import AdminFormAuthentication from "./AdminFormAuthentication";

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
  let [showSignForm, setShowSignForm] = useState(false);

  const adminButtonClicked = () => {
    setShowSignForm(true);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.adminAndSearchDiv}>
          <img src={Logo} alt="Logo" className={styles.logo} />
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

      <AdminFormAuthentication
        showSignForm={showSignForm}
        setShowSignForm={setShowSignForm}
      />
    </>
  );
}
