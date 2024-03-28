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
    forUpdate: boolean;
  } | null;
}) {
  let updateClicked = () => {
    alert("update");
  };

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

  const addToCartClicked = () => {
    alert("add");
  };

  const decideWhatTheButtonIsUsedFor = ():
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined => {
    if (deletable != null && !deletable.forUpdate) return deleteClicked;

    if (deletable != null && deletable.forUpdate) return updateClicked;

    return addToCartClicked;
  };

  const decideWhatButtonSays = () => {
    if (deletable != null && !deletable.forUpdate) return "delete";

    if (deletable != null && deletable.forUpdate) return "update";

    return "add to cart";
  };

  const decideWhatStyleToUse = () => {
    if (deletable != null && !deletable.forUpdate) return styles.deleteButton;
    if (deletable != null && deletable.forUpdate) return styles.updateButton;
    return styles.addToCartButton;
  };

  const NotEditableCard = () => {
    return (
      <div className={styles.card}>
        <img src={image} className={styles.img} />

        <div className={styles.groupOfCardContent}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
            dolor omnis iste maiores? Dolores maiores magni reiciendis
            voluptates dolor exercitationem.
          </p>
          <p className={styles.price}>Price: ${price} Br</p>
        </div>
        <button
          className={decideWhatStyleToUse()}
          onClick={decideWhatTheButtonIsUsedFor()}
        >
          {decideWhatButtonSays()}
        </button>
      </div>
    );
  };

  //make it editable

  const EditableCard = () => {
    return (
      <div className={styles.card}>
        <img src={image} className={styles.img} />

        <div className={styles.groupOfCardContent}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
            dolor omnis iste maiores? Dolores maiores magni reiciendis
            voluptates dolor exercitationem.
          </p>
          <p className={styles.price}>Price: ${price} Br</p>
        </div>
        <button
          className={decideWhatStyleToUse()}
          onClick={decideWhatTheButtonIsUsedFor()}
        >
          {decideWhatButtonSays()}
        </button>
      </div>
    );
  };

  const decideToBeEditable = () => {
    if (deletable != null && deletable.forUpdate) return <EditableCard />;

    return <NotEditableCard />;
  };

  return <>{decideToBeEditable()}</>;
}

export default ProductCard;
