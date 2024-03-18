import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Loading.module.css";
import { ThreeCircles } from "react-loader-spinner";
import GlobalContextHolder from "./ContextHolder";

const Loading = ({ color }: { color: string }) => {
  let getDialog = useRef<any>();

  let { openDialog } = useContext(GlobalContextHolder);

  useEffect(
    () =>
      openDialog ? getDialog.current.showModal() : getDialog.current.close(),
    [openDialog]
  );

  return (
    <dialog className={styles.dialog} ref={getDialog}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color={color}
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </dialog>
  );
};

export default Loading;
