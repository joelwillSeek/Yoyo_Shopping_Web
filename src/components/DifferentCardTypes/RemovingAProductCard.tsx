import React, { useContext } from "react";
import { removeAProduct } from "../../firebase/firebaseBackEnd";
import styles from "../../styles/card.module.css";
import Product from "../../firebase/Product";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";

export default function RemovingAProductCard({
  price,
  title,
  id,
  image,
  setAllProducts,
  setFilteredProductBySearch,
  description,
}: {
  description: string;
  price: number;
  title: string;
  image: string;
  id: string;
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setFilteredProductBySearch: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const { setOpenDialog } = useContext(GlobalContextHolder);
  //
  async function deleteClicked() {
    setOpenDialog("Removing Product");

    try {
      const response = await removeAProduct(id);

      if (response) {
        alert("successfully Removed");

        //this resets the product without fetching data
        setAllProducts((products) => {
          return products.filter((product) => product.ID != id);
        });

        setFilteredProductBySearch((products) => {
          return products.filter((product) => product.ID != id);
        });
      } else {
        alert("failed to Remove");
      }
    } catch (e) {
      alert(e + " Cant Remove");
    } finally {
      setOpenDialog("");
    }
  }

  return (
    <div className={styles.card}>
      <img src={image} className={styles.img} />

      <div className={styles.groupOfCardContent}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>Price: ${price} Br</p>
      </div>
      <button className={styles.addToCartButton} onClick={deleteClicked}>
        {"Remove"}
      </button>
    </div>
  );
}
