import Product from "../firebase/Product";
import { removeAProduct } from "../firebase/firebaseBackEnd";
import styles from "../styles/card.module.css";
import React from "react";

function ProductCard({
  price,
  title,
  id,
  image,
  deletable,
}: {
  price: number;
  title: string;
  image: string;
  id: string;
  deletable: {
    setFilteredProductBySearch: React.Dispatch<React.SetStateAction<Product[]>>;
    setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  } | null;
}) {
  let deleteClicked = () => {
    removeAProduct(id)
      .then((response) => {
        if (response) {
          alert("successfully deleted");
        } else {
          alert("failed to delete");
        }

        if (deletable != null)
          deletable.setAllProducts((products) => {
            return products.filter((product) => product.ID != id);
          });

        deletable?.setFilteredProductBySearch((products) => {
          return products.filter((product) => product.ID != id);
        });
      })
      .catch((error) => alert(error + " Cant Remove"));
  };

  let addToCartClicked = () => {
    alert("add");
  };

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
      <button
        className={
          deletable != null ? styles.deleteButton : styles.addToCartButton
        }
        onClick={deletable != null ? deleteClicked : addToCartClicked}
      >
        {deletable != null ? "delete" : "Add to cart"}
      </button>
    </div>
  );
}

export default ProductCard;
