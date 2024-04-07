import React, { useContext, useEffect, useRef } from "react";
import styles from "../../styles/adminformauthentication.module.css";
import { auth } from "../../firebase/firebaseSDK";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";

export default function AdminFormAuthentication({
  showSignForm,
  setShowSignForm,
}: {
  setShowSignForm: React.Dispatch<React.SetStateAction<boolean>>;
  showSignForm: boolean;
}) {
  let enterEmailRef = useRef<HTMLInputElement | null>(null);
  let passwordRef = useRef<null | HTMLInputElement>(null);
  let { setOpenDialog } = useContext(GlobalContextHolder);
  let openAdminAuthenticationForm = useRef<null | HTMLDialogElement>(null);

  const goToAdmin = useNavigate();

  function onCheckingIfAdmin(event: React.MouseEvent) {
    event.preventDefault();

    if (
      enterEmailRef.current?.value == null ||
      passwordRef.current?.value == null
    )
      return;

    setOpenDialog("Checking Admin");
    let email = enterEmailRef.current?.value;
    let password = passwordRef.current?.value;

    if (email.length < 1 || password.length < 1) {
      alert("Check If you field is empty");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        goToAdmin("/Admin");
      })
      .catch((error) => alert("Error Of Login: " + error))
      .finally(() => setOpenDialog(""));
  }

  function cancelSignIn(
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void {
    event.preventDefault();
    setShowSignForm(false);
  }

  useEffect(() => {
    if (showSignForm) openAdminAuthenticationForm.current?.showModal();
    else openAdminAuthenticationForm.current?.close();
    console.log("log");
  }, [showSignForm]);

  return (
    <dialog ref={openAdminAuthenticationForm} className={styles.dialogAuthForm}>
      <h1 className={styles.signFormTitle}>Admin Login Form</h1>
      <form className={styles.adminAuthForm}>
        <input
          type="email"
          placeholder="Enter Email"
          pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
          minLength={1}
          ref={enterEmailRef}
        />
        <input
          type="password"
          placeholder="Password"
          pattern="[a-zA-Z0-9_.+-]+"
          minLength={1}
          ref={passwordRef}
        />
        <div className={styles.horizontalGroup}>
          <input type="submit" value={"Submit"} onClick={onCheckingIfAdmin} />
          <input
            type="button"
            value={"Cancel"}
            onClick={cancelSignIn}
            className={styles.cancelButton}
          />
        </div>
      </form>
    </dialog>
  );
}
