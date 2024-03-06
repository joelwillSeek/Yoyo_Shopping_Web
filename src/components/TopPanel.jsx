import React, { useState } from "react";
import styles from "../styles/toppanel.module.css"

/**
 * 
 * @param {{setFilter:Array,getFilter:Array}}
 * @returns 
 */
export default function TopPanel({setSearch}){


    return <nav className={styles.nav}>
        <img src="#" alt="Logo" />
        <div className={styles.adminAndSearchDiv}>
        <button className={styles.adminButton}>Admin</button>
        <input type="search" onChange={(e)=> setSearch(e.target.value)} className={styles.searchInput} placeholder="Search"/>
        </div>
       
    </nav>;
}