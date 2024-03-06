import React from "react";
import styles from "../styles/toppanel.module.css"

export default function TopPanel(){


    return <nav className={styles.nav}>
        <button className={styles.adminButton}>Admin</button>
    </nav>;
}