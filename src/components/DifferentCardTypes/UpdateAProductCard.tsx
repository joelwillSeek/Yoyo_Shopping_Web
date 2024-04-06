import React, { useContext, useRef, useState } from "react";
import styles from "../../styles/updateaproduct.module.css";
import { updateAProduct } from "../../firebase/firebaseBackEnd";
import Product from "../../firebase/Product";
import { imageRef, storage } from "../../firebase/firebaseSDK";
import { v4 } from "uuid";
import {
  StorageError,
  UploadTaskSnapshot,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import GlobalContextHolder from "../ContextRelatedThings/ContextHolder";
const defaultImage = require("../../assets/upload.svg");

export default function UpdateAProductCard({
  price,
  title,
  id,
  image,
  description,
  category,
}: {
  price: number;
  title: string;
  image: string;
  id: string;
  description: string;
  category: string;
}) {
  let [editedImage, setEditedImage] = useState<FileList | string>(image);
  let editedTitle = useRef<HTMLInputElement | null>(null);
  let labelToDisplayImageRef = useRef<HTMLLabelElement | null>(null);
  let editedDescription = useRef<HTMLInputElement | null>(null);
  let editedPrice = useRef<HTMLInputElement | null>(null);
  let editedCategory = useRef<HTMLInputElement | null>(null);

  let { setOpenDialog } = useContext(GlobalContextHolder);

  function WhenImageIsChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const label = labelToDisplayImageRef.current;
    if (label == null || event.target.files == null) return;

    label.style.backgroundImage = `url(${URL.createObjectURL(
      event.target.files[0]
    )})`;

    setEditedImage(event.target.files);
  }

  async function updateClicked() {
    setOpenDialog("Updating Products");

    if (checkIfTheFieldsAreEmpty()) {
      alert("Fill all the fields");
      return;
    }

    function checkIfTheFieldsAreEmpty() {
      return (
        editedTitle.current == null ||
        editedDescription.current == null ||
        editedPrice.current == null ||
        editedImage == null ||
        editedCategory == null
      );
    }

    if (editedImage instanceof FileList) {
      const referenceForImage = await imageRef(
        storage,
        `ProductImage/${editedImage[0].name + v4() + editedImage[0].type}`
      );

      const response = uploadBytesResumable(referenceForImage, editedImage[0]);

      const showProgress = (snapShot: UploadTaskSnapshot) =>
        (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

      await response.on(
        "state_changed",
        onUploadChangeProgress,
        onUploadError,
        onUploadComplete
      );

      function onUploadComplete() {
        getDownloadURL(response.snapshot.ref).then((passedUrl) => {
          if (passedUrl == "") {
            alert("image url not found from web");
            // setOpenDialog(false);
            return;
          }
          updateTheProduct(passedUrl);
        });
      }

      function onUploadError(error: StorageError) {
        setOpenDialog("");
        alert("Error Of Upload: " + error);
        console.log(error);
      }

      function onUploadChangeProgress(snapShot: UploadTaskSnapshot) {
        console.log(showProgress(snapShot));
      }
    } else {
      updateTheProduct(image);
    }

    function updateTheProduct(url: string) {
      let newProduct = new Product(
        editedTitle.current!.value,
        Number.parseFloat(editedPrice.current!.value),
        url,
        editedDescription.current!.value,
        editedCategory.current!.value
      );

      newProduct.ID = id;

      updateAProduct(newProduct);

      setOpenDialog("");
    }
  }

  return (
    <div className={styles.card}>
      <label
        htmlFor="imagePicker"
        className={styles.labelImage}
        ref={labelToDisplayImageRef}
        style={{
          backgroundImage: `url(${
            image.trim() == "test" || image.trim() == "" ? defaultImage : image
          })`,
        }}
      ></label>

      <input
        type="file"
        className={styles.imageInput}
        accept="image/png, image/jpg, image/jpeg, image/gif"
        id="imagePicker"
        onChange={WhenImageIsChanged}
      />

      <div className={styles.groupOfCardContent}>
        <input
          type="text"
          defaultValue={title}
          className={styles.editableTitle}
          ref={editedTitle}
        ></input>

        <input
          type="text"
          defaultValue={description}
          className={styles.editableDescription}
          ref={editedDescription}
        />

        <input
          type="number"
          defaultValue={price == null || Number.isNaN(price) ? 0 : price}
          className={styles.editablePrice}
          ref={editedPrice}
        />

        <input
          type="text"
          defaultValue={category}
          className={styles.editableCategory}
          ref={editedCategory}
        />
      </div>
      <button className={styles.updateButton} onClick={updateClicked}>
        {"Update"}
      </button>
    </div>
  );
}
