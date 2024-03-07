import React from "react";
import styles from "../styles/catagories.module.css";

/**
 * 
 * @param {{color:String,name:String}  
 */
export default function Catagories({name,color}){

    return <div className={styles.category} style={{backgroundColor:color}}> 
        {getSearchSvg()} <p>{capitalize(name)}</p>
    </div>
}

let capitalize=(name)=>name.charAt(0).toUpperCase().concat(name.slice(1));

let getSearchSvg=()=><svg xmlns="http://www.w3.org/2000/svg" class={styles.searchSvg} viewBox="0 0 512 512">
    <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448" />
    </svg>