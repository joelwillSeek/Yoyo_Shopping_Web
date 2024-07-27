import React, { useState } from "react";
import backgroundImage from "../../assets/bg.jpg";
import style from "./styles/landingpage.module.css";
import Logo from "../../assets/logoTitleOrange.png";
import { useNavigate } from "react-router-dom";
import AdminFormAuthentication from "../ShoppingPage/AdminFormAuthentication";

export default function LandingPage() {
  const navigate = useNavigate();
  let [showSignForm, setShowSignForm] = useState(false);

  function goToAdminConsole() {
    setShowSignForm(true);
  }

  return (
    <>
      <div
        className={style.landingPage}
        style={{
          background: `linear-gradient(180deg,rgba(0, 0, 0, 0.5), rgba(255, 182, 66, 0.2)),url(${backgroundImage})`,
        }}
      >
        <nav className={style.navigationBar}>
          <img className={style.Logo} src={Logo} alt="Logo" />
          <button className={style.adminButton} onClick={goToAdminConsole}>
            Admin Console
          </button>
        </nav>

        <div className={style.landingPageText}>
          <h1>Some Title here</h1>
          <p>Some Other Text</p>
          <button>Go Shopping</button>
        </div>
      </div>

      <AdminFormAuthentication
        showSignForm={showSignForm}
        setShowSignForm={setShowSignForm}
      ></AdminFormAuthentication>
    </>
  );
}
