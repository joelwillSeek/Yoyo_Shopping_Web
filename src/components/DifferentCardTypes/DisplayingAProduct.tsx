import React from "react";
import styles from "../../styles/card.module.css";

export default function DisplayingAProduct({
  price,
  title,
  image,
  description,
}: {
  price: number;
  title: string;
  image: string;
  description: string;
}) {
  const addToCartClicked = () => {
    alert("add");
  };

  return (
    <div className={styles.card}>
      <img src={image} className={styles.img} />

      <div className={styles.groupOfCardContent}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>Price: ${price} Br</p>
      </div>
      <button className={styles.addToCartButton} onClick={addToCartClicked}>
        {"Add To Cart"}
      </button>
    </div>
  );
}
