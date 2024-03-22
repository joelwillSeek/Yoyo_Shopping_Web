import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Loading.module.css";
import { ThreeCircles } from "react-loader-spinner";
import GlobalContextHolder from "./ContextHolder";

/**
 * so the way the loading works is that when its and empty string then it will not display loading screen
 * but if it has then dialog will appear and display the string passed
 */

const Loading = ({ color }: { color: string }) => {
  let getDialog = useRef<any>();

  let { openDialog } = useContext(GlobalContextHolder);

  useEffect(
    () =>
      openDialog.trim().length > 0
        ? getDialog.current?.showModal()
        : getDialog.current?.close(),
    [openDialog]
  );

  return (
    <dialog className={styles.dialog} ref={getDialog}>
      <div className={styles.content}>
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color={color}
          ariaLabel="three-circles-loading"
          wrapperClass={styles.centerSelf}
        />
        <h1>{openDialog}</h1>
      </div>
    </dialog>
  );
};

export default Loading;
