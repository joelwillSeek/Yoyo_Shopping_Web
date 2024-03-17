import styles from "../styles/card.module.css";
import React from "react";

function ProductCard({
  price,
  title,
  image,
}: {
  price: number;
  title: string;
  image: string;
}) {
  return (
    <div className={styles.card}>
      <img src={image} className={styles.img} />

      <div className={styles.groupOfCardContent}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias dolor
          omnis iste maiores? Dolores maiores magni reiciendis voluptates dolor
          exercitationem.
        </p>
        <p className={styles.price}>Price: ${price} Br</p>
      </div>
    </div>
  );
}

export default ProductCard;
