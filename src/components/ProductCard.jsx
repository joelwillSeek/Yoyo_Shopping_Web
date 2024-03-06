import styles from "../styles/card.module.css"
import React from "react";

function ProductCard({price,title,src}){

    return <div className={styles.card}>
        <img src={src} className={styles.img} />
        
        <div className={styles.row}>
        <p><b>{title}</b></p>
        <p><b>Price: {price}</b></p>
        </div>
        
        <div className={styles.row}>
        </div>
    </div>;
}

export default ProductCard; 