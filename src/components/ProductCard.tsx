import Product from "../firebase/Product";
import { removeAProduct } from "../firebase/firebaseBackEnd";
import styles from "../styles/card.module.css";
import React, { useRef, useState } from "react";

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
  let [editedImage, setEditedImage] = useState<FileList | string>(image);
  let editedTitle = useRef<HTMLInputElement | null>(null);

  let updateClicked = () => {};

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
    let labelRef = useRef<HTMLLabelElement | null>(null);

    const imageChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      const label = labelRef.current;
      if (label == null || event.target.files == null) return;

      label.style.backgroundImage = `url(${URL.createObjectURL(
        event.target.files[0]
      )})`;

      setEditedImage(event.target.files);
    };

    return (
      <div className={styles.card}>
        <label
          htmlFor="imagePicker"
          className={styles.labelImage}
          ref={labelRef}
          style={{ backgroundImage: `url(${image})` }}
        ></label>

        <input
          type="file"
          className={styles.imageInput}
          accept="image/png, image/jpg, image/jpeg, image/gif"
          id="imagePicker"
          onChange={imageChanged}
        />

        <div className={styles.groupOfCardContent}>
          <input
            type="text"
            value={title}
            className={styles.editableTitle}
            ref={editedTitle}
          ></input>

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
