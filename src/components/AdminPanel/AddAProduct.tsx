import React, { useContext, useRef, useState } from "react";
import { addAProduct } from "../../firebase/firebaseBackEnd";
import Product from "../../firebase/Product";
import GlobalContextHolder from "../ContextHolder";
import styles from "../../styles/addaproduct.module.css";
import { imageRef, storage } from "../../firebase/firebaseSDK";
import { v4 } from "uuid";

/**
 *
 * change the image to be uploaded first then create a product
 */

export default function AddAProduct() {
  let titleRef = useRef(null);
  let descriptionRef = useRef(null);
  let priceRef = useRef(null);

  let categoryRef = useRef(null);
  let { openDialog } = useContext(GlobalContextHolder);
  let [image, setImage] = useState<FileList | null>();

  let addButtonClicked = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (image == null) {
      alert("Didn't pick image");
      return;
    }

    let title: HTMLInputElement = titleRef.current!;
    let price: HTMLInputElement = priceRef.current!;
    let category: HTMLInputElement = categoryRef.current!;
    let description: HTMLInputElement = descriptionRef.current!;

    openDialog = true;

    const refernceForImage = await imageRef(
      storage,
      `ProductImage/${image?.[0].name + v4()}`
    );

    addAProduct(newProduct).then(() => (openDialog = false));

    let newProduct = new Product(
      title.value,
      parseFloat(price.value),
      image.value,
      description.value,
      category.value
    );
  };

  return (
    <form className={styles.wholeForm}>
      <input
        type="file"
        onChange={(event) => {
          setImage(event.target.files);
        }}
      />
      <input type="text" placeholder="Title" ref={titleRef} />
      <input type="text" placeholder="Description" ref={descriptionRef} />
      <input type="text" placeholder="Price" ref={priceRef} />
      <input type="text" placeholder="Category" ref={categoryRef} />
      <button onClick={addButtonClicked}>Add</button>
    </form>
  );
}
